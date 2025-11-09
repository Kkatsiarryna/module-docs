import { useNavigate } from 'react-router-dom'
import { useLogoutMutation, authApi } from '@features/auth/api'
import { routes } from '@shared/config'
import { useAppDispatch } from '@app/store'

type Setting = 'Настройки' | 'Выйти'

export const useDropdownUser = (setAnchorElUser: (value: HTMLElement | null) => void) => {
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleMenuItemClick = async (setting: Setting) => {
    handleCloseUserMenu()

    if (setting === 'Настройки') {
      navigate(routes.profile)
      return
    }

    if (setting === 'Выйти') {
      try {
        await logout().unwrap()
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        dispatch(authApi.util.resetApiState())
        navigate(routes.login, { replace: true })
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }
  }

  return {
    handleCloseUserMenu,
    handleMenuItemClick,
  }
}
