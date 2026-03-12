import fs from 'fs/promises';
import path from "path";
import { getPathNames } from './get-path-names.js';

const { __dirname } = getPathNames(import.meta.url);

// 动态组件目录（确保存在）
const dir = path.resolve(__dirname, '../__dynamic__');
await fs.mkdir(dir, { recursive: true });

/**
 *  动态生成组件文件
 * @param {string} componentName 组件名
 * @param {string} svelteCode 组件字符串
 * @returns {Promise<string | undefined>} 组件导入路径
 */
export async function generateDynamicComponent(componentName, svelteCode) {
  if (!componentName || !svelteCode) return;
  const componentPath = path.join(dir, `${componentName}.svelte`);
  await fs.writeFile(componentPath, svelteCode.trim(), 'utf-8');
  return `$lib/docs/__dynamic__/${componentName}.svelte`;
}
