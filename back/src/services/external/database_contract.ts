export type DBClient = {
  queryObject: <T>(
    query: TemplateStringsArray,
    ...args: unknown[]
  ) => Promise<{ rows: T[] }>;
};

export type WithClientFunc = <T>(cb: (c: DBClient) => Promise<T>) => Promise<T>;
