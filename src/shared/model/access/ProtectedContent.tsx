import type { ReactNode } from 'react'
import { useHasRole } from './use-has-role.ts'

interface ProtectedContentProps {
  roles?: string[]
  children: ReactNode
  fallback?: ReactNode
}

export const ProtectedContent = ({ roles, children, fallback = null }: ProtectedContentProps) => {
  const hasAccess = useHasRole(roles)

  if (!hasAccess) return <>{fallback}</>
  return <>{children}</>
}
