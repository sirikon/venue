export type CommandParam =
  & { name: string; description?: string }
  & ({
    kind: "option";
    default?: string;
  } | { kind: "flag" });

export type CommandData = {
  name: string;
  description?: string;
  params: CommandParam[];
  arguments: string[];
  action: ((ctx: Record<string, unknown>) => void);
};

export class CommandBuilder<TParams extends Record<string, unknown>> {
  constructor(
    private _data: Omit<CommandData, "action">,
    private _save: (cmd: CommandData) => void,
  ) {}

  public description(d: string) {
    return new CommandBuilder<TParams>(
      {
        ...this._data,
        description: d,
      },
      this._save,
    );
  }

  public option<TParamKey extends string>(
    name: TParamKey,
    opts?: {
      default?: string;
      description?: string;
    },
  ) {
    return new CommandBuilder<TParams & { [key in TParamKey]: string }>(
      {
        ...this._data,
        params: [...this._data.params, {
          name,
          description: opts?.description,
          kind: "option",
          default: opts?.default,
        }],
      },
      this._save,
    );
  }

  public flag<TParamKey extends string>(
    name: TParamKey,
    opts?: {
      description?: string;
    },
  ) {
    return new CommandBuilder<TParams & { [key in TParamKey]: boolean }>(
      {
        ...this._data,
        params: [...this._data.params, {
          name,
          description: opts?.description,
          kind: "flag",
        }],
      },
      this._save,
    );
  }

  public arguments<TParamKey extends string>(...args: TParamKey[]) {
    return new CommandBuilder<TParams & { [key in TParamKey]: string }>(
      {
        ...this._data,
        arguments: args,
      },
      this._save,
    );
  }

  public action(fn: (ctx: TParams) => void) {
    this._save({ ...this._data, action: fn as CommandData["action"] });
  }

  public getData() {
    return this._data;
  }
}
