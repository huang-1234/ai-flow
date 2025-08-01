import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// 认证上下文类型
interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

// 用户类型
interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | null>(null)

// 认证提供者组件
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  // 初始化时检查用户是否已登录
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken')

        if (!token) {
          setIsAuthenticated(false)
          setUser(null)
          setIsLoading(false)
          return
        }

        // 这里应该调用API验证token并获取用户信息
        // 为了简化示例，我们假设token存在就是已认证
        setIsAuthenticated(true)
        setUser({
          id: '1',
          email: 'user@example.com',
          name: '测试用户',
          role: 'user',
        })
      } catch (error) {
        console.error('认证检查失败:', error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // 登录
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // 这里应该调用API进行登录
      // 为了简化示例，我们假设任何邮箱密码都能登录
      const mockResponse = {
        accessToken: 'mock-token-' + Date.now(),
        user: {
          id: '1',
          email,
          name: email.split('@')[0],
          role: 'user' as const,
        },
      }

      localStorage.setItem('accessToken', mockResponse.accessToken)
      setUser(mockResponse.user)
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {
      console.error('登录失败:', error)
      throw new Error('登录失败，请检查邮箱和密码')
    } finally {
      setIsLoading(false)
    }
  }

  // 登出
  const logout = () => {
    localStorage.removeItem('accessToken')
    setIsAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// 认证钩子
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth必须在AuthProvider内部使用')
  }

  return context
}