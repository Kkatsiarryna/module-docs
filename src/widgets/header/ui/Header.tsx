import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import styles from './Header.module.scss'

const settings = ['Настройки', 'Выйти']

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logoImg = {
    xs: 'src/shared/assets/logo/mobile_logo.svg',
    md: 'src/shared/assets/logo/logo.svg',
    title: 'Betera',
  }

  const user = {
    name: 'John',
    surname: 'Doe',
    role: 'Администратор',
    img: '',
  }

  function stringAvatar(name: string) {
    return {
      className: styles.stringAvatar,
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
  }

  return (
    <AppBar className={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img 
              srcSet={`${logoImg.xs}?w=64&h=50&fit=crop&auto=format&dpr=2 2x`}
              src={`${logoImg.xs}?w=64&h=50&fit=crop&auto=format`}
              alt={logoImg.title}
              loading="lazy"
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <img
              srcSet={`${logoImg.md}?w=155h=40&fit=crop&auto=format&dpr=2 2x`}
              src={`${logoImg.md}?w=155&h=40&fit=crop&auto=format`}
              alt={logoImg.title}
              loading="lazy"
            />
          </Box>
          {/* Блок с ролью пользователя */}
          <MenuItem component="div" className={styles.userRole}>
            <Typography className={styles.userRoleText}>{user.role}</Typography>
          </MenuItem>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                src={user.img}
                alt={`${user.name} ${user.surname}`}
                {...(!user.img && stringAvatar(`${user.name} ${user.surname}`))}
              >
                {!user.img && stringAvatar(`${user.name} ${user.surname}`).children}
              </Avatar>
            </IconButton>
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
              {/* Пункты меню */}
              {settings.map(setting => (
                <MenuItem
                  key={setting}
                  onClick={setting !== 'Роль' ? handleCloseUserMenu : undefined} // Роль не кликабельна
                  component="div"
                  className={styles.menuItem}
                >
                  {setting === 'Настройки' && (
                    <Avatar
                      src="src/shared/assets/icons/outlined/settings.svg"
                      className={styles.menuIcon}
                    />
                  )}
                  {setting === 'Выйти' && (
                    <Avatar
                      src="src/shared/assets/icons/outlined/log-out.svg"
                      className={styles.menuIcon}
                    />
                  )}
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
