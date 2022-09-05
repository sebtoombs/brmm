import executeCommand from "./executeCommand";
import executeSingleCommand from "./executeSingleCommand";
import { performance } from "perf_hooks";

jest.mock("./executeSingleCommand", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe("executeCommand", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should execute a string command", async () => {
    await executeCommand('echo "hello"', { tasks: {} });
    expect(executeSingleCommand).toHaveBeenCalledWith('echo "hello"');
  });

  test("should execute an array of commands in series", async () => {
    await executeCommand(['echo "hello"', 'echo "world"'], { tasks: {} });
    expect(executeSingleCommand).toHaveBeenNthCalledWith(1, 'echo "hello"');
    expect(executeSingleCommand).toHaveBeenNthCalledWith(2, 'echo "world"');
  });

  test("an array of commands should resolve in series", async () => {
    let execCount = 0;

    (executeSingleCommand as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        const timeout = (2 - execCount) * 10;
        execCount++;
        setTimeout(() => {
          resolve(execCount);
        }, timeout);
      });
    });

    const startTime = performance.now();

    const result = await executeCommand(['echo "hello"', 'echo "world"'], {
      tasks: {},
    });
    expect(executeSingleCommand).toHaveBeenNthCalledWith(1, 'echo "hello"');
    expect(executeSingleCommand).toHaveBeenNthCalledWith(2, 'echo "world"');
    expect(result).toEqual([1, 2]);

    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan((2 + 1) * 10 + 10);
    expect(endTime - startTime).toBeGreaterThan((2 + 1) * 10 - 10);
  });

  test("should execute an object command with parallel", async () => {
    (executeSingleCommand as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 500);
      });
    });

    const startTime = performance.now();

    await executeCommand(
      {
        parallel: ['echo "hello"', 'echo "world"'],
      },
      { tasks: {} }
    );

    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(510);
  });

  test("should execute an object command with series", async () => {
    (executeSingleCommand as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 10);
      });
    });

    const startTime = performance.now();

    await executeCommand(
      {
        series: ['echo "hello"', 'echo "world"'],
      },
      { tasks: {} }
    );

    const endTime = performance.now();

    expect(endTime - startTime).toBeGreaterThan(20);
  });
});
