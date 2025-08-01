import jwt from 'jsonwebtoken'
import type { AuthTokens, User } from '@ai-flow/common'

// 默认配置
const DEFAULT_CONFIG = {
  accessTokenSecret: 'access-token-secret',
  refreshTokenSecret: 'refresh-token-secret',
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
}

export interface JwtConfig {
  accessTokenSecret: string
  refreshTokenSecret: string
  accessTokenExpiry: string
  refreshTokenExpiry: string
}

/**
 * 创建JWT令牌
 */
export function createTokens(
  user: Pick<User, 'id' | 'email' | 'role'>,
  config: JwtConfig = DEFAULT_CONFIG,
): AuthTokens {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  }

  const accessToken = jwt.sign(payload, config.accessTokenSecret, {
    expiresIn: config.accessTokenExpiry,
  })

  const refreshToken = jwt.sign(
    { sub: user.id },
    config.refreshTokenSecret,
    { expiresIn: config.refreshTokenExpiry },
  )

  return {
    accessToken,
    refreshToken,
    expiresIn: getExpiryInSeconds(config.accessTokenExpiry),
  }
}

/**
 * 验证访问令牌
 */
export function verifyAccessToken(
  token: string,
  secret: string = DEFAULT_CONFIG.accessTokenSecret,
) {
  try {
    return jwt.verify(token, secret) as jwt.JwtPayload
  } catch (error) {
    throw new Error('Invalid or expired access token')
  }
}

/**
 * 验证刷新令牌
 */
export function verifyRefreshToken(
  token: string,
  secret: string = DEFAULT_CONFIG.refreshTokenSecret,
) {
  try {
    return jwt.verify(token, secret) as jwt.JwtPayload
  } catch (error) {
    throw new Error('Invalid or expired refresh token')
  }
}

/**
 * 刷新令牌
 */
export function refreshTokens(
  refreshToken: string,
  user: Pick<User, 'id' | 'email' | 'role'>,
  config: JwtConfig = DEFAULT_CONFIG,
): AuthTokens {
  // 验证刷新令牌
  const payload = verifyRefreshToken(refreshToken, config.refreshTokenSecret)

  if (payload.sub !== user.id) {
    throw new Error('Invalid refresh token')
  }

  // 创建新令牌
  return createTokens(user, config)
}

/**
 * 将过期时间字符串转换为秒数
 */
function getExpiryInSeconds(expiry: string): number {
  const match = expiry.match(/^(\d+)([smhd])$/)
  if (!match) {
    return 900 // 默认15分钟
  }

  const [, value, unit] = match
  const num = parseInt(value, 10)

  switch (unit) {
    case 's': return num
    case 'm': return num * 60
    case 'h': return num * 60 * 60
    case 'd': return num * 60 * 60 * 24
    default: return 900
  }
}
