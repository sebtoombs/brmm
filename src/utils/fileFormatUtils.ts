export function isYaml(fileName: string) {
  return fileName.endsWith(".yaml") || fileName.endsWith(".yml");
}

export function isJson(fileName: string) {
  return fileName.endsWith(".json");
}

export function isJs(fileName: string) {
  return fileName.endsWith(".js");
}
