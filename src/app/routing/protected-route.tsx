import { Navigate, useLocation } from 'react-router-dom'
import { selectIsLoggedIn } from '@features/auth/model'
import { useAppSelector } from '@app/store'

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
