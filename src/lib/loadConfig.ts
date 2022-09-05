import { isJs, isYaml } from "../utils/fileFormatUtils";
import { parse as parseYaml } from "yaml";
import fs from "fs/promises";
import { Config } from "../types";

/**
 * loadConfig
 *
 * More like 'readAndParseConfig'
 *
 * Takes the config file, and either reads it (if it's yaml or json)
 * or requires it (if it's a js file)
 *
 * @param configFile
 * @returns config
 */
export default async function loadConfig(configFile: string): Promise<Config> {
  if (isYaml(configFile)) {
    try {
      return parseYaml(await readConfigFile(configFile));
    } catch (e: any) {
      throw new Error(`Could not parse ${configFile}: ${e.message}`);
    }
  }
  if (isJs(configFile)) {
    try {
      return require(configFile);
    } catch (e: any) {
      if (e.code === "MODULE_NOT_FOUND") {
        throw new Error(`Could not find config file: ${configFile}`);
      } else {
        throw new Error(`Error parsing config file: ${e.message}`);
      }
    }
  }

  // Either it's json, or just try to parse it as json
  try {
    return JSON.parse(await readConfigFile(configFile));
  } catch (e: any) {
    throw new Error(`Could not parse ${configFile}: ${e.message}`);
  }
}

function readConfigFile(configFile: string) {
  return fs.readFile(configFile, "utf-8");
}
