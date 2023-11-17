import { assertUnreachable } from "../../types/mod.ts";
import { CommandData } from "./command.ts";
import { CommandGroupBuilder, CommandGroupData } from "./commandGroup.ts";
import { help } from "./help.ts";

export function run(groupBuilder: CommandGroupBuilder) {
  runGroup(groupBuilder.getData(), Deno.args);
}

function runGroup(group: CommandGroupData, args: string[]) {
  if (args.length === 0) {
    help(group);
    return;
  }

  const arg = args[0];
  const matchingCommand = group.commands.find((c) => c.name === arg);
  if (matchingCommand) {
    runCommand(matchingCommand, args.slice(1));
    return;
  }

  const matchingGroup = group.groups.find((g) => g.name === arg);
  if (matchingGroup) {
    runGroup(matchingGroup, args.slice(1));
    return;
  }

  console.log(`Unknown command: ${arg}`);
}

function runCommand(cmd: CommandData, args: string[]) {
  const actionContext: Record<string, unknown> = {};

  for (const param of cmd.params) {
    if (param.kind === "option") {
      const matchingArgPosition = args.findIndex((a) =>
        a === `--${param.name}`
      );
      if (matchingArgPosition === -1) {
        if (param.default == null) {
          console.log(`Required option not found: --${param.name}`);
          Deno.exit(1);
        }
        actionContext[param.name] = param.default;
        continue;
      }
      actionContext[param.name] = args[matchingArgPosition + 1];
      args.splice(matchingArgPosition, 2);
      continue;
    }

    if (param.kind === "flag") {
      const matchingArgPosition = args.findIndex((a) =>
        a === `--${param.name}`
      );
      actionContext[param.name] = matchingArgPosition >= 0;
      matchingArgPosition >= 0 && args.splice(matchingArgPosition, 1);
      continue;
    }

    assertUnreachable(param);
  }

  const remainingArguments = args.filter((a) => !a.startsWith("--"));
  if (remainingArguments.length < cmd.arguments.length) {
    console.log(`Not enough arguments.`);
    return;
  }

  for (const [i, arg] of cmd.arguments.entries()) {
    actionContext[arg] = remainingArguments[i];
  }

  cmd.action(actionContext);
}

export const cli = (name: string) =>
  new CommandGroupBuilder({ name, commands: [], groups: [], parent: null });
