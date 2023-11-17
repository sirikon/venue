import { blue, bold, dim } from "std/fmt/colors.ts";

import { CommandGroupData } from "./commandGroup.ts";

export function help(group: CommandGroupData, level = 0) {
  if (level !== 0 && group.options?.hidden) return;
  const b = level * 2;
  if (level === 0) console.log();
  console.log(
    `${pad(b + 2)}${
      blue(bold([
        ...(level === 0 ? parentNames(group) : []),
        group.name,
      ].join(" ")))
    }`,
  );
  for (const command of group.commands) {
    console.log(
      `${pad(b + 4)}${bold(command.name)} ${
        command.arguments.map((a) => `[${a}]`).join(" ")
      }${
        command.description && command.arguments.length === 0
          ? dim(command.description)
          : ""
      }`,
    );
    if (command.arguments.length > 0 && command.description) {
      console.log(`${pad(b + 6)}${dim(command.description)}`);
    }
    for (const param of command.params) {
      console.log(
        `${pad(b + 6)}--${param.name}${
          dim(param.description ? ` ${param.description}` : "")
        }`,
      );
    }
  }
  for (const subgroup of group.groups) {
    help(subgroup, level + 1);
  }
  if (level === 0) console.log();
}

function pad(n: number) {
  return "".padStart(n, " ");
}

function parentNames(group: CommandGroupData): string[] {
  if (!group.parent) return [];
  return [group.parent.name, ...parentNames(group.parent)];
}
