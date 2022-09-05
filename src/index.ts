import path from "path";

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import logger from "./logger";
import loadConfig from "./lib/loadConfig";
import validateConfig from "./lib/validateConfig";
import { locateConfigFile } from "./lib/locateConfigFile";
import executeTask from "./lib/executeTask";

const argv = yargs(hideBin(process.argv))
  .option("config", {
    type: "string",
    description: "Provide a path to a config file",
  })
  // Unfortunately specifying the alias in the option (above) fails to provide the type for c
  .alias("config", "c")
  .parseSync();

async function main() {
  const task = argv._.at(0) as string | undefined;
  if (!task) {
    throw new Error("No task provided");
  }
  const customConfigFile = argv.config || argv.c;

  const configFile = customConfigFile
    ? path.join(process.cwd(), customConfigFile)
    : await locateConfigFile();

  if (!configFile) {
    throw new Error("Could not find a config file");
  }

  logger.info(`Using config file ${configFile}`);

  const config = await loadConfig(configFile);
  if (!config || typeof config !== "object") {
    throw new Error("Config file did not return a valid config object");
  }

  await validateConfig(config);

  if (!config.tasks[task]) {
    throw new Error(`Task ${task} not found in config file`);
  }

  await executeTask(config, task);
}

try {
  main();
} catch (e) {
  logger.error(e);
  process.exit(1);
}
