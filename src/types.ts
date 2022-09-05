export type Command =
  | string
  | Command[]
  | {
      parallel?: Command[];
    }
  | {
      series?: Command[];
    };

export type TaskConfig =
  | string
  | string[]
  | {
      command: Command;
      pre: Command;
      post: Command;
    };

export type Config = {
  tasks: {
    [key: string]: TaskConfig;
  };
};
