import executeCommand from "./executeCommand";
import executeTask from "./executeTask";

jest.mock("./executeCommand", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe("executeTask", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should execute a string command", async () => {
    const config = {
      tasks: {
        test: 'echo "hello"',
      },
    };
    await executeTask(config, "test");
    expect(executeCommand).toHaveBeenCalledWith('echo "hello"', config);
  });

  test("should execute an array of strings command", async () => {
    const config = {
      tasks: {
        test: ['echo "hello"', 'echo "world"'],
      },
    };
    await executeTask(config, "test");
    expect(executeCommand).toHaveBeenCalledWith(
      ['echo "hello"', 'echo "world"'],
      config
    );
  });

  test("should execute an object command", async () => {
    const config = {
      tasks: {
        test: {
          pre: 'echo "hello"',
          command: 'echo "world"',
          post: 'echo "!"',
        },
      },
    };
    await executeTask(config, "test");
    expect(executeCommand).toHaveBeenNthCalledWith(1, 'echo "hello"', config);
    expect(executeCommand).toHaveBeenNthCalledWith(2, 'echo "world"', config);
    expect(executeCommand).toHaveBeenNthCalledWith(3, 'echo "!"', config);
  });

  test.todo("Test resolution order of pre, command, and post");
});
