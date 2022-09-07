import logger from "../logger";
import { Config } from "../types";
import executeCommand from "./executeCommand";

export default async function executeTask(config: Config, task: string) {
  const taskConfig = config.tasks[task];

  if (typeof taskConfig === "string" || Array.isArray(taskConfig)) {
    logger.info(`Executing command for ${task}`);
    return executeCommand(taskConfig, config);
  }
  if (
    typeof taskConfig === "object" &&
    ("parallel" in taskConfig || "series" in taskConfig)
  ) {
    logger.info(`Executing command for ${task}`);
    return executeCommand(taskConfig, config);
  }
  if (typeof taskConfig === "object") {
    const results: {
      pre?: any;
      command?: any;
      post?: any;
    } = {};

    if (taskConfig.pre) {
      logger.info(`Executing pre command for ${task}`);
      results.pre = await executeCommand(taskConfig.pre, config);
    }
    if (taskConfig.command) {
      logger.info(`Executing command for ${task}`);
      results.command = await executeCommand(taskConfig.command, config);
    }
    if (taskConfig.post) {
      logger.info(`Executing post command for ${task}`);
      results.post = await executeCommand(taskConfig.post, config);
    }

    return results.command;
  }

  return null;
}
