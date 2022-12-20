import { writeAll } from "std/streams/conversion.ts";
import { Progress } from "../ui/helpers/progress.ts";

export const writeFile = (path: string, data: string | string[]) =>
  Deno.writeFile(
    path,
    new TextEncoder().encode(Array.isArray(data) ? data.join("\n") : data),
  );

export const readFile = (path: string) =>
  Deno.readFile(path).then((d) => new TextDecoder().decode(d));

export const downloadFile = async (
  url: string,
  path: string,
  label: string,
) => {
  const response = await fetch(url);
  if (response.status >= 400) {
    throw new Error("Request failed with status code " + response.status);
  }

  const file = await Deno.open(path, { create: true, write: true });
  const contentLength = response.headers.get("content-length");
  const size = contentLength ? parseInt(contentLength) : null;

  let c = 0;
  const progress = new Progress();
  for await (const chunk of response.body!) {
    await writeAll(file, chunk);
    c += chunk.length;

    await (size
      ? progress.set({ prefix: label, mode: "percent", value: c / size })
      : progress.set({ prefix: label + ": bytes", mode: "total", value: c }));
  }
  file.close();
};
