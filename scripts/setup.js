#!/usr/bin/env node

/**
 * 项目初始化脚本
 * 检查环境并安装所有依赖
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 检查Node.js版本
const requiredNodeVersion = fs.readFileSync(path.join(__dirname, '..', '.nvmrc'), 'utf8').trim();
const currentNodeVersion = process.version.slice(1); // 去掉v前缀

console.log(`检查Node.js版本...`);
console.log(`当前版本: ${currentNodeVersion}`);
console.log(`所需版本: ${requiredNodeVersion}`);

// 简单版本比较
const currentParts = currentNodeVersion.split('.').map(Number);
const requiredParts = requiredNodeVersion.split('.').map(Number);

let isNodeVersionValid = true;
for (let i = 0; i < 3; i++) {
  if (currentParts[i] > requiredParts[i]) {
    break;
  }
  if (currentParts[i] < requiredParts[i]) {
    isNodeVersionValid = false;
    break;
  }
}

if (!isNodeVersionValid) {
  console.error(`错误: Node.js版本不匹配，请安装 ${requiredNodeVersion} 或更高版本`);
  console.error(`推荐使用nvm安装所需版本:`);
  console.error(`  nvm install ${requiredNodeVersion}`);
  console.error(`  nvm use ${requiredNodeVersion}`);
  process.exit(1);
}

// 检查pnpm
console.log(`检查pnpm...`);
try {
  const pnpmVersion = execSync('pnpm -v', { encoding: 'utf8' }).trim();
  console.log(`pnpm版本: ${pnpmVersion}`);
} catch (error) {
  console.error(`错误: 未找到pnpm，请先安装pnpm`);
  console.error(`安装命令: npm install -g pnpm`);
  process.exit(1);
}

// 安装所有依赖
console.log(`\n开始安装所有依赖...`);
try {
  execSync('pnpm install', { stdio: 'inherit' });
  console.log(`\n✅ 依赖安装成功!`);
} catch (error) {
  console.error(`\n❌ 依赖安装失败`);
  console.error(error.message);
  process.exit(1);
}

console.log(`\n项目初始化完成，可以开始开发了!`);
console.log(`\n可用命令:`);
console.log(`  pnpm dev - 启动所有项目开发模式`);
console.log(`  pnpm build - 构建所有项目`);
console.log(`  pnpm test - 运行所有测试`);
console.log(`  pnpm add:pkg <package> <dependencies...> [--dev] - 为指定包添加依赖`);