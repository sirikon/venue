// deno-lint-ignore ban-types
type Flatter<T> = { [K in keyof T]: T[K] } & {};

type ParamDef<T> = {
  description: string;
  default?: string;
  required?: boolean;
  map?: (v: string) => T;
};

type ConfigStruct<
  T extends Record<string, ParamDef<unknown>>,
> = Flatter<
  Readonly<
    {
      [K in keyof T]: T[K]["map"] extends NonNullable<ParamDef<unknown>["map"]>
        ? T[K]["required"] extends false
          ? (ReturnType<NonNullable<T[K]["map"]>> | null)
        : ReturnType<NonNullable<T[K]["map"]>>
        : T[K]["required"] extends false ? (string | null)
        : string;
    }
  >
>;

export type ConfigModel = Record<string, ParamDef<unknown>>;

export const buildConfig = <
  T extends ConfigModel,
>(
  model: T,
) => {
  return {
    model: model as ConfigModel,
    read: () => {
      const result: Record<string, unknown> = {};
      for (const param in model) {
        const paramDef = model[param];
        const value = Deno.env.get(param);
        const mapper = paramDef?.map || ((v: string) => v);

        if (value) {
          result[param] = mapper(value);
          continue;
        }

        if (paramDef.default) {
          result[param] = mapper(paramDef.default);
          continue;
        }

        if (paramDef.required == null || paramDef.required === true) {
          throw new Error(`Missing required environment variable: ${param}`);
        }

        result[param] = null;
      }
      return result as ConfigStruct<T>;
    },
  };
};
