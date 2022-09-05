import * as yup from "yup";
import { Config } from "../types";

/**
 * validateConfig
 *
 * @param config
 * @returns
 */
export default async function validateConfig(config: Config) {
  const schema = yup.object().shape({
    tasks: yup.object().required(),
  });

  return schema.validate(config);
}
