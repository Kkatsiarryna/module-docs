import { Navigate, useLocation } from 'react-router-dom'
import { selectIsLoggedIn } from '@features/auth/model'
import { useAppSelector } from '@app/store'
import { routes } from '@shared/config'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const location = useLocation()

  //console.log(location)
  if (!isLoggedIn) {
    return <Navigate to={routes.login} state={{ from: location }} replace />
  }

  return <>{children}</>
}
