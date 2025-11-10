import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@app/store'
import { selectIsLoggedIn } from '@features/auth/model'
import { routes } from '@shared/config'
import type { ReactNode } from 'react'

interface ProtectedConfirmRouteProps {
  children: ReactNode
}

export const ProtectedConfirmRoute = ({ children }: ProtectedConfirmRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const location = useLocation()

  if (isLoggedIn) {
    return <Navigate to={routes.documents} replace />
  }

  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')

  if (!token) {
    return <Navigate to={routes.login} replace />
  }

  return <>{children}</>
}
