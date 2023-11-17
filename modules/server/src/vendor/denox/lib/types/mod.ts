// deno-lint-ignore ban-types
export type Flatter<T> = { [K in keyof T]: T[K] } & {};
export type ExactOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const assertUnreachable = (_: never) => {};
