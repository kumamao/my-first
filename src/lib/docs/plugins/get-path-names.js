import path from "path";
import { fileURLToPath } from "url";

/**
 * 
 * @param {string} url 文件路径
 * @returns {{ __filename: string; __dirname: string }}
 */
export function getPathNames(url) {
  const __filename = fileURLToPath(url);
  const __dirname = path.dirname(__filename);

  return { __filename, __dirname }
}
