import { Navigate, useLocation } from 'react-router-dom'
import { selectIsLoggedIn, selectUser } from '@features/auth/model'
import { useAppSelector } from '@app/store'
import { routes } from '@shared/config'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  roles?: string[]
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const user = useAppSelector(selectUser)
  const location = useLocation()

  //console.log(location)
  if (!isLoggedIn) {
    return <Navigate to={routes.login} state={{ from: location }} replace />
  }

  if (roles && roles.length > 0) {
    const userRole = user?.role

    if (!userRole || !roles.includes(userRole)) {
      return <Navigate to={routes.documents} replace />
    }
  }

  return <>{children}</>
}
