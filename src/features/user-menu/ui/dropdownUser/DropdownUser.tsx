import Menu from '@mui/material/Menu'
import styles from '@features/user-menu/ui/dropdownUser/DropdownUser.module.scss'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Icon } from '@shared/model/icon/Icon.tsx'
import { ICONS, SIZES_ICON } from '@shared/ui/icons/icons.ts'
import { useDropdownUser } from '@features/user-menu/model'

interface DropdownUserProps {
  anchorElUser: HTMLElement | null
  setAnchorElUser: (value: HTMLElement | null) => void
}

const settings = ['Настройки', 'Выйти'] as const

export const DropdownUser = ({ anchorElUser, setAnchorElUser }: DropdownUserProps) => {
  const { handleCloseUserMenu, handleMenuItemClick } = useDropdownUser(setAnchorElUser)

  return (
    <Menu
      className={styles.menuContainer}
      classes={{ paper: styles.menuPaper }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {settings.map(setting => (
        <MenuItem
          key={setting}
          component="div"
          onClick={() => handleMenuItemClick(setting)}
          className={styles.menuItem}
        >
          {setting === 'Настройки' && (
            // В марджине применяем значение 2, чтобы получить отступ 8px, так как MUI по умолчанию умножает значения на 4
            <Icon component={ICONS.SETTINGS} size={SIZES_ICON.SMALL} marginRight={2} />
          )}
          {setting === 'Выйти' && (
            <Icon component={ICONS.LOGOUT} size={SIZES_ICON.SMALL} marginRight={2} />
          )}
          <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}
