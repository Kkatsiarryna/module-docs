import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import styles from './Header.module.scss'
import { UserAvatar } from '@shared/ui/avatar/UserAvatar'
import { DropdownUser } from '@shared/ui/dropdowns/dropdownUser/DropdownUser'

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
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

  return (
    <AppBar className={styles.appBar}>
      <Container className={styles.appBarContainer} maxWidth="xl">
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
          <MenuItem component="div" className={styles.userRole}>
            <Typography className={styles.userRoleText}>{user.role}</Typography>
          </MenuItem>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <UserAvatar />
            </IconButton>
            <DropdownUser anchorElUser={anchorElUser} setAnchorElUser={setAnchorElUser} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
