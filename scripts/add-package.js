#!/usr/bin/env node

/**
 * 辅助脚本，用于快速向指定包添加依赖
 *
 * 使用方法:
 * node scripts/add-package.js <package> <dependencies...> [--dev]
 *
 * 示例:
 * node scripts/add-package.js common lodash zod
 * node scripts/add-package.js web-pc react-router-dom --dev
 */

const { execSync } = require('child_process');

// 获取命令行参数
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('用法: node add-package.js <package> <dependencies...> [--dev]');
  process.exit(1);
}

// 解析参数
const targetPackage = args[0];
const isDev = args.includes('--dev');
const dependencies = args.slice(1).filter(arg => arg !== '--dev');

// 包名映射
const packageMap = {
  'common': '@ai-flow/common',
  'auth': '@ai-flow/auth',
  'lexical': '@ai-flow/lexical-ui',
  'web-pc': '@ai-flow/web-pc',
  'web-mobile': '@ai-flow/web-mobile',
  'gateway': '@ai-flow/gateway',
  'agent': '@ai-flow/agent-core'
};

// 检查目标包是否有效
if (!packageMap[targetPackage]) {
  console.error(`错误: 未知的包 "${targetPackage}"`);
  console.error('可用的包: common, auth, lexical, web-pc, web-mobile, gateway, agent');
  process.exit(1);
}

const fullPackageName = packageMap[targetPackage];

// 构建命令
const command = `pnpm --filter ${fullPackageName} add ${isDev ? '-D' : ''} ${dependencies.join(' ')}`;

console.log(`执行: ${command}`);

try {
  // 执行命令
  execSync(command, { stdio: 'inherit' });
  console.log(`成功为 ${fullPackageName} 添加依赖: ${dependencies.join(', ')}`);
} catch (error) {
  console.error(`错误: 添加依赖失败`);
  console.error(error.message);
  process.exit(1);
}