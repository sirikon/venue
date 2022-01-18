export type DBClient = {
  queryObject: (
    query: TemplateStringsArray,
    ...args: unknown[]
  ) => Promise<{ rows: unknown[] }>;
};

export type WithClientFunc = <T>(cb: (c: DBClient) => Promise<T>) => Promise<T>;
