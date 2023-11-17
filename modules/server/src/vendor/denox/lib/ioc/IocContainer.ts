import { assertUnreachable } from "../types/mod.ts";

// deno-lint-ignore no-explicit-any
export type Clazz<T = unknown> = new (...args: any[]) => T;

// deno-lint-ignore ban-types
export type RegistrationOptions = {};

export type ProviderParams = {
  parent: Clazz | null;
};

type ClazzInfo = {
  type: "automatic";
  dependencies: Clazz[];
  options: RegistrationOptions;
} | {
  type: "provider";
  provider: (params: ProviderParams) => unknown;
};

export class IocContainer {
  private registeredClazzez: Clazz[] = [];
  private clazzInfo: { [key: number]: ClazzInfo } = {};
  private instances: { [key: number]: unknown } = {};

  public register(
    clazz: Clazz,
    dependencies: Clazz[],
    options: RegistrationOptions,
  ) {
    let index = this.registeredClazzez.indexOf(clazz);
    if (index === -1) {
      index = this.registeredClazzez.push(clazz) - 1;
    }
    this.clazzInfo[index] = { type: "automatic", dependencies, options };
  }

  public registerProvider<T>(
    clazz: Clazz<T>,
    provider: (params: ProviderParams) => T,
  ) {
    let index = this.registeredClazzez.indexOf(clazz);
    if (index === -1) {
      index = this.registeredClazzez.push(clazz) - 1;
    }
    this.clazzInfo[index] = { type: "provider", provider };
  }

  public resolve<T>(clazz: Clazz<T>, parentClazz?: Clazz): T {
    const index = this.registeredClazzez.indexOf(clazz);
    if (index === -1) {
      throw new Error(`Class ${clazz.name} not registered`);
    }

    const info = this.clazzInfo[index];
    if (info.type === "provider") {
      return info.provider({ parent: parentClazz || null }) as T;
    }

    if (info.type === "automatic") {
      if (this.instances[index] == null) {
        const dependentInstances = info.dependencies.map((d) =>
          this.resolve(d, clazz)
        );
        this.instances[index] = new clazz(...dependentInstances);
      }
      return this.instances[index] as T;
    }

    assertUnreachable(info);
    throw new Error("This should not happen");
  }
}
