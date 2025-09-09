import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { UserRole } from '@/lib/database.types'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
  redirectTo?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/signin'
}) => {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to sign in if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Redirect to sign in if profile is required but not loaded
  if (!profile) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Check role-based access
  if (requiredRole && profile.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const roleDashboards = {
      student: '/dashboard/student',
      teacher: '/dashboard/teacher',
      admin: '/dashboard/admin'
    }
    
    return <Navigate to={roleDashboards[profile.role]} replace />
  }

  return <>{children}</>
}

// Specific role-based route components
export const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="student">{children}</ProtectedRoute>
)

export const TeacherRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="teacher">{children}</ProtectedRoute>
)

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
)

// Public route that redirects authenticated users to their dashboard
export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect authenticated users to their dashboard
  if (user && profile) {
    const roleDashboards = {
      student: '/dashboard/student',
      teacher: '/dashboard/teacher',
      admin: '/dashboard/admin'
    }
    
    return <Navigate to={roleDashboards[profile.role]} replace />
  }

  return <>{children}</>
}
