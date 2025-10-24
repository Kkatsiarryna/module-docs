import Menu from '@mui/material/Menu'
import styles from '@shared/ui/dropdowns/dropdownUser/DropdownUser.module.scss'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Icon } from '@shared/model/Icon'
import { ICONS, SIZES_ICON } from '@shared/ui/icons/icons'

interface DropdownUserProps {
  anchorElUser: HTMLElement | null
  setAnchorElUser: (value: HTMLElement | null) => void
}

const settings = ['Настройки', 'Выйти']

  export const DropdownUser = ({ anchorElUser, setAnchorElUser }: DropdownUserProps) => {

    const handleCloseUserMenu = () => {
      setAnchorElUser(null)
    }

    return (
      <Menu
        className={styles.menuContainer}
        classes={{ paper: styles.menuPaper }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top', // Меню под иконкой
          horizontal: 'right', // Правая граница меню выравнивается по правой границе иконки
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top', // Верхняя граница меню будет у края иконки
          horizontal: 'right', // Меню будет "вырастать" справа налево
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(setting => (
          <MenuItem
            key={setting}
            component="div"
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
