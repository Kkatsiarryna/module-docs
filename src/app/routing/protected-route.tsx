import { useAppSelector } from '@shared/lib'

import { Navigate, useLocation } from 'react-router-dom'
import { selectIsLoggedIn } from '@features/auth/model'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
