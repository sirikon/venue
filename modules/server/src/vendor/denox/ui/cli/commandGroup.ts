import { CommandBuilder, CommandData } from "./command.ts";

export type CommandGroupData = {
  name: string;
  commands: CommandData[];
  groups: CommandGroupData[];
  parent: CommandGroupData | null;
  options?: {
    hidden?: boolean;
  };
};

export class CommandGroupBuilder {
  constructor(
    private _data: CommandGroupData,
  ) {}

  public command(name: string) {
    return new CommandBuilder(
      { name, params: [], arguments: [] },
      (d) => this._data.commands.push(d),
    );
  }

  public group(name: string, options?: CommandGroupData["options"]) {
    const group: CommandGroupData = {
      name,
      commands: [],
      groups: [],
      parent: this._data,
      options,
    };
    this._data.groups.push(group);
    return new CommandGroupBuilder(group);
  }

  public getData() {
    return this._data;
  }
}
