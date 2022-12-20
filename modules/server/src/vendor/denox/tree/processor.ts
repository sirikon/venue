import { Clazz, TreeNode, treeNodes } from "./treeNode.ts";

export async function processor() {
  const productionIndex: Map<Clazz<unknown>, TreeNode[]> = new Map();
  const parentCount: Map<TreeNode, number> = new Map();
  const links: Map<TreeNode, TreeNode[]> = new Map();
  const executionPlan: TreeNode[] = [];
  const data: Map<Clazz<unknown>, unknown[]> = new Map();

  const plan = () => {
    initializeParentCount();

    treeNodes.forEach((n) =>
      n.producedTypes.forEach((t) => addProduction(t, n))
    );

    treeNodes.forEach((n) => walk(n));

    while (parentCount.size > 0) {
      const nodesToExecute: TreeNode[] = [];

      for (const [node, count] of parentCount) {
        if (count === 0) {
          nodesToExecute.push(node);
        }
      }

      for (const node of nodesToExecute) {
        executionPlan.push(node);
        unlink(node);
        parentCount.delete(node);
      }
    }
  };

  const execute = async () => {
    for (const node of executionPlan) {
      const ctx: Record<string, unknown> = {};
      node.consumedTypes.forEach((t) => {
        ctx[t.argument] = data.get(t.clazz) || [];
      });
      const result = (await Promise.resolve(node.action(ctx))) || [];
      for (const item of result) {
        // deno-lint-ignore no-explicit-any
        const clazz = ((item as any).constructor as Clazz<unknown>);
        data.set(clazz, [...(data.get(clazz) || []), item]);
      }
    }
  };

  const walk = (node: TreeNode, history: TreeNode[] = []) => {
    if (history.indexOf(node) >= 0) {
      console.log("ERROR: Cyclic dependency");
      console.log(history);
      Deno.exit(1);
    }

    for (const consumedType of node.consumedTypes) {
      for (
        const parentNode of (productionIndex.get(consumedType.clazz) || [])
      ) {
        link(parentNode, node);
        walk(parentNode, [...history, node]);
      }
    }
  };

  const initializeParentCount = () =>
    treeNodes.forEach((n) => parentCount.set(n, 0));

  const incrementParentCount = (node: TreeNode, inc: number) =>
    parentCount.set(node, (parentCount.get(node) || 0) + inc);

  const addProduction = (clazz: Clazz<unknown>, node: TreeNode) =>
    productionIndex.set(clazz, [...(productionIndex.get(clazz) || []), node]);

  const link = (nodeA: TreeNode, nodeB: TreeNode) => {
    if ((links.get(nodeA) || []).indexOf(nodeB) === -1) {
      incrementParentCount(nodeB, 1);
      links.set(nodeA, [...(links.get(nodeA) || []), nodeB]);
    }
  };

  const unlink = (node: TreeNode) => {
    for (const n of links.get(node) || []) {
      incrementParentCount(n, -1);
    }
    links.delete(node);
  };

  plan();
  await execute();
}
