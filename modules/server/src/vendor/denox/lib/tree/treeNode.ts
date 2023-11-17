import { Flatter } from "denox/types/mod.ts";

// deno-lint-ignore no-explicit-any
export type Clazz<T> = new (...args: any[]) => T;

export type ConsumedType = {
  argument: string;
  clazz: Clazz<unknown>;
};

export type TreeNode = {
  // deno-lint-ignore no-explicit-any
  action: (ctx: any) => Promise<unknown[] | void> | unknown[] | void;
  consumedTypes: ConsumedType[];
  producedTypes: Clazz<unknown>[];
};

export const treeNodes: TreeNode[] = [];

export class TreeNodeBuilder<
  TConsumptionRecord extends Record<never, never>,
  // deno-lint-ignore ban-types
  TProduction extends object,
> {
  constructor(
    private consumedTypes: ConsumedType[],
    private producedTypes: Clazz<unknown>[],
  ) {}

  consumes<TArgument extends string, TClazz>(
    argument: TArgument,
    clazz: Clazz<TClazz>,
  ) {
    return new TreeNodeBuilder<
      Flatter<TConsumptionRecord & { [key in TArgument]: TClazz[] }>,
      TProduction
    >(
      [...this.consumedTypes, { argument, clazz }],
      this.producedTypes,
    );
  }

  // deno-lint-ignore ban-types
  produces<TClazz extends object>(
    clazz: Clazz<TClazz>,
  ) {
    return new TreeNodeBuilder<TConsumptionRecord, TProduction | TClazz>(
      this.consumedTypes,
      [...this.producedTypes, clazz],
    );
  }

  does(
    a: (
      ctx: TConsumptionRecord,
    ) => Promise<TProduction[] | void> | TProduction[] | void,
  ) {
    treeNodes.push({
      action: a,
      consumedTypes: this.consumedTypes,
      producedTypes: this.producedTypes,
    });
  }
}

export const treeNode = () =>
  new TreeNodeBuilder<Record<never, never>, never>([], []);
