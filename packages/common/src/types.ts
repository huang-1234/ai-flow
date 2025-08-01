import { z } from 'zod'

// Agent类型定义
export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Agent = z.infer<typeof AgentSchema>

// Agent任务类型定义
export const AgentTaskSchema = z.object({
  id: z.string(),
  agentId: z.string(),
  status: z.enum(['pending', 'running', 'completed', 'failed']),
  input: z.record(z.unknown()),
  output: z.record(z.unknown()).optional(),
  error: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().optional(),
})

export type AgentTask = z.infer<typeof AgentTaskSchema>

// 用户类型定义
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['user', 'admin']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type User = z.infer<typeof UserSchema>

// 认证相关类型
export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

// 分页参数
export interface PaginationParams {
  page: number
  limit: number
}

// 分页结果
export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}