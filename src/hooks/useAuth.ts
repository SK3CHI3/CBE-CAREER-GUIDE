import { useAuth as useAuthContext } from '@/contexts/AuthContext'

export const useAuth = useAuthContext

// Additional auth hooks for specific use cases
export const useUser = () => {
  const { user } = useAuth()
  return user
}

export const useProfile = () => {
  const { profile } = useAuth()
  return profile
}

export const useSession = () => {
  const { session } = useAuth()
  return session
}

export const useIsAuthenticated = () => {
  const { user, loading } = useAuth()
  return { isAuthenticated: !!user, loading }
}

export const useUserRole = () => {
  const { profile } = useAuth()
  return profile?.role || null
}

export const useIsStudent = () => {
  const role = useUserRole()
  return role === 'student'
}

export const useIsTeacher = () => {
  const role = useUserRole()
  return role === 'teacher'
}

export const useIsAdmin = () => {
  const role = useUserRole()
  return role === 'admin'
}
