import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '@features/auth/api'
import { routes } from '@shared/config'

type Setting = 'Настройки' | 'Выйти'

export const useDropdownUser = (setAnchorElUser: (value: HTMLElement | null) => void) => {
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

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
