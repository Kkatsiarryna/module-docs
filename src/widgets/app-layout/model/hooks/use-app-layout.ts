import { useAppSelector } from '@app/store'
import { selectUser } from '@features/auth/model'
import { useLocation } from 'react-router-dom'

export const useAppLayout = () => {
  const user = useAppSelector(selectUser)
  const { pathname } = useLocation()
  const isHideHeader = ['/', '/login', '/confirm-password'].includes(pathname)

  return {
    user,
    isHideHeader,
  }
}
