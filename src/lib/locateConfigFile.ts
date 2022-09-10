import fs from "fs/promises";
import path from "path";
import logger from "../logger";

/**
 * locateConfigFile
 *
 * Will search for a brmm.config file in the current working directory like this;
 * - brmm.config.yml
 * - brmm.config.yaml
 * - brmm.config.js
 * - brmm.config.json
 */
export default async function locateConfigFile() {
  const tryFileNames = [
    "brmm.config.yml",
    "brmm.config.yaml",
    "brmm.config.js",
    "brmm.config.json",
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
