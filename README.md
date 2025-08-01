# AI Flow

全栈Monorepo项目，包含前端、后端和共享库。

## 项目结构

```
├── apps/
│   ├── web-pc/      # PC前端(React18+Vite+TypeScript)
│   └── web-mobile/  # 移动端(React18+Vite+TypeScript)
├── servers/
│   ├── gateway/     # GraphQL网关(MidwayJS)
│   └── agent-core/  # LangGraph服务(Koa+Python桥接)
├── packages/
│   ├── common/      # 通用TS类型/工具
│   ├── auth/        # JWT认证库
│   └── lexical-ui/  # 富文本编辑器组件
└── infra/           # Docker/K8s配置
```

## 环境要求

- Node.js: v16.20.1 或更高版本
- pnpm: v8.6.7 或更高版本

## 项目初始化

首次克隆项目后，请运行初始化脚本：

```bash
# 检查环境并安装所有依赖
pnpm setup
```

## 安装依赖

### 安装所有依赖

```bash
pnpm install:all
```

### 为特定包添加依赖

#### 方法一：使用预设脚本

```bash
# 为common包添加依赖
pnpm add:common [package-name]

# 为common包添加开发依赖
pnpm add:dev:common [package-name]

# 可用的包命令
# - add:common, add:auth, add:lexical
# - add:web-pc, add:web-mobile
# - add:gateway, add:agent
# - add:dev:common, add:dev:auth, add:dev:lexical
# - add:dev:web-pc, add:dev:web-mobile
# - add:dev:gateway, add:dev:agent
```

#### 方法二：使用快速安装脚本

```bash
# 为指定包添加依赖
pnpm add:pkg <package> <dependencies...> [--dev]

# 示例：为common包添加lodash依赖
pnpm add:pkg common lodash

# 示例：为web-pc包添加react-router-dom开发依赖
pnpm add:pkg web-pc react-router-dom --dev

# 可用的包简称：
# - common, auth, lexical
# - web-pc, web-mobile
# - gateway, agent
```

## 开发

```bash
# 启动所有项目开发模式
pnpm dev

# 构建所有项目
pnpm build

# 运行所有测试
pnpm test

# 运行代码检查
pnpm lint
```