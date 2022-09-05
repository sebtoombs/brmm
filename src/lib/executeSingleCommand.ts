import { execa } from "execa";
import logger from "../logger";

export default async function executeSingleCommand(command: string) {
  const [cmd, ...args] = command.split(" ");

  logger.debug(`Executing command: ${command}`);

  const subprocess = execa(cmd, args, { shell: true });

  if (!subprocess.stdout) {
    throw new Error(`Failed to execute command: ${command}`);
  }
  subprocess.stdout.pipe(process.stdout);

  const { stdout } = await subprocess;

  return stdout;
}
