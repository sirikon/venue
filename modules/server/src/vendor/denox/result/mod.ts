export type Result<T, E> =
  | ({ success: true } & T)
  | ({ success: false; error: Error } & E);

export const must = <T, E>(result: Result<T, E>): T => {
  if (!result.success) {
    throw result.error;
  }
  return result;
};
