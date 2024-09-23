import { exists } from "std/fs/mod.ts";
import { writeFile } from "../../fs/mod.ts";
import { bash, cmd } from "../../shell/mod.ts";

export type Package = {
  name: string;
};

export type Repository = {
  kind: string;
  url: string;
  areas: string[];
  options?: {
    arch?: string;
    keyring?: [string, string];
    trusted?: boolean;
  };
};

export type Pin = {
  packageName: string;
  release: string;
  priority: number;
};

let ALREADY_REFRESHED = false;

export const ensureBasePackages = async () => {
  await ensurePackages(
    "apt-transport-https",
    "ca-certificates",
    "gnupg",
    "debian-archive-keyring",
    "debian-keyring",
    "curl",
  );
};

export const setRepositories = async (repositories: Repository[]) => {
  for (const repo of repositories) {
    await ensureKeyring(repo);
  }
  await writeFile(
    "/etc/apt/sources.list.d/srkbz.list",
    [...repositories.map((r) => buildRepoLine(r)), ""],
  );
  ALREADY_REFRESHED = false;
};

export const setPins = async (pins: Pin[]) => {
  await writeFile(
    "/etc/apt/preferences.d/99srkbz",
    pins.map((pin) => [
      `Package: ${pin.packageName}`,
      `Pin: release ${pin.release}`,
      `Pin-Priority: ${pin.priority}`,
      "",
    ]).flat(),
  );
  ALREADY_REFRESHED = false;
};

export const ensurePackages = async (...packages: string[]) => {
  const installedPackages = await getInstalledPackages();
  const packagesToInstall = packages.filter((p) =>
    !installedPackages.some((ip) => p === ip)
  );

  if (packagesToInstall.length === 0) return;

  await refreshPackages();
  await cmd([
    "apt-get",
    "install",
    "-y",
    ...packagesToInstall,
  ]);
};

const ensureKeyring = async (repo: Repository) => {
  if (repo.options?.keyring == null) return;

  const keyringFilePath = getKeyringFilePath(repo.options.keyring);
  if (await exists(keyringFilePath)) return;

  const [_, url] = repo.options.keyring;
  await bash(`curl -fsSL "${url}" | gpg --dearmor -o "${keyringFilePath}"`);
};

const getKeyringFilePath = ([name]: [string, string]) =>
  `/usr/share/keyrings/${name}-srkbz-archive-keyring.gpg`;

async function refreshPackages() {
  if (ALREADY_REFRESHED) return;
  await cmd(["apt-get", "update"]);
  ALREADY_REFRESHED = true;
}

const getInstalledPackages = async () => {
  const result = await cmd([
    "bash",
    "-c",
    "dpkg --get-selections | grep -v deinstall",
  ], { stdout: "piped" });
  return (await result.output())
    .trim()
    .split("\n")
    .map((line) => line.split("\t")[0].split(":")[0]);
};

const buildRepoLine = (repo: Repository) => {
  const keyringFilePath = repo.options?.keyring
    ? getKeyringFilePath(repo.options.keyring)
    : null;

  const params = [
    ...(repo.options?.arch ? [`arch=${repo.options.arch}`] : []),
    ...(repo.options?.trusted ? ["trusted=yes"] : []),
    ...(keyringFilePath ? [`signed-by=${keyringFilePath}`] : []),
  ];

  const paramsChunk = params.length > 0 ? ` [${params.join(" ")}] ` : " ";
  const areasChunk = repo.areas.join(" ");

  return `${repo.kind}${paramsChunk}${repo.url} ${areasChunk}`;
};
