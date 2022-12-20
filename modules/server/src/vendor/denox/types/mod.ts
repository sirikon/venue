export type ExactOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const assertUnreachable = (_: never) => {};
