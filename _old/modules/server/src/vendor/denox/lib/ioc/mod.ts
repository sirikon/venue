import { Reflect } from "reflect_metadata/mod.ts";
import { Clazz, IocContainer, RegistrationOptions } from "./IocContainer.ts";

export const registerDecorator = (
  ioc: IocContainer,
  opts?: RegistrationOptions,
) => {
  return (clazz: Clazz) => {
    const dependencies = Reflect.getMetadata("design:paramtypes", clazz) || [];
    ioc.register(clazz, dependencies, opts || {});
  };
};

export * from "./IocContainer.ts";
