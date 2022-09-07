import fs from "fs/promises";
import path from "path";
import logger from "../logger";

/**
 * locateConfigFile
 *
 * Will search for a buildr.config file in the current working directory like this;
 * - buildr.config.yml
 * - buildr.config.yaml
 * - buildr.config.js
 * - buildr.config.json
 */
export default async function locateConfigFile() {
  const tryFileNames = [
    "buildr.config.yml",
    "buildr.config.yaml",
    "buildr.config.js",
    "buildr.config.json",
  ];

  let fileName;
  for (let index = 0; index < tryFileNames.length && !fileName; index += 1) {
    const tryFileName = tryFileNames[index];
    try {
      /* eslint-disable no-await-in-loop */
      await fs.access(path.join(process.cwd(), tryFileName));
      fileName = tryFileName;
    } catch (e) {
      logger.debug(`Could not find ${tryFileName}`);
    }
  }

  return fileName;
}
