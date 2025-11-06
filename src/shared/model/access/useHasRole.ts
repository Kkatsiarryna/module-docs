import { useAppSelector } from '@app/store'
import { selectUser } from '@features/auth/model'

export const useHasRole = (roles?: string[]): boolean => {
  const user = useAppSelector(selectUser)
  const userRole = user?.role

  if (!roles || roles.length === 0) return true
  if (!userRole) return false

  return roles.includes(userRole)
}
