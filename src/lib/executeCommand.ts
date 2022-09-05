import { Command, Config } from "../types";
import executeSingleCommand from "./executeSingleCommand";
import executeTask from "./executeTask";

type ExecResult = any | ExecResult[];

/**
 * executeCommand
 *
 * Takes a command config (string, array) and executes each command
 */
export default async function executeCommand(
  command: Command,
  config: Config
): Promise<ExecResult> {
  if (typeof command === "string") {
    // Allow config to call other tasks
    if (command.length && !command.match(/\s/) && config?.tasks?.[command]) {
      return executeTask(config, command);
    }
    return await executeSingleCommand(command);
  }
  // Execute an array of commands in series
  if (Array.isArray(command)) {
    const results = [];
    for (const cmd of command) {
      results.push(await executeCommand(cmd, config));
    }
    return results;
  }
  // Execute an object command
  if (typeof command === "object" && !Array.isArray(command)) {
    if ("parallel" in command && Array.isArray(command.parallel)) {
      return await Promise.all(
        command.parallel.map((cmd) => executeCommand(cmd, config))
      );
    }
    if ("series" in command && Array.isArray(command.series)) {
      const results = [];
      for (const cmd of command.series) {
        results.push(await executeCommand(cmd, config));
      }
      return results;
    }
  }
}