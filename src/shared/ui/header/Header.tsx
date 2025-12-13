import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import styles from './Header.module.scss'
import { Avatar } from '@shared/ui/avatar/Avatar'
import type { User } from '@features/auth/model'
import { TokenUserRoles } from '@shared/model/user'
import { DropdownUser } from '@features/user-menu/ui'
// import MobileLogo from '@shared/assets/logo/mobile_logo.svg?react'
// import DesktopLogo from '@shared/assets/logo/logo.svg?react'

type Props = {
  user: User
}

export const Header = ({ user }: Props) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const displayRole = TokenUserRoles[user.role]

  return (
    <AppBar className={styles.appBar}>
      <Container className={styles.appBarContainer} maxWidth="xl">
        <Toolbar disableGutters className={styles.toolbar}>
          {/*<Box className={styles.logoWrapperMobile}>*/}
          {/*  <MobileLogo className={styles.logoMobile} aria-label="Betera" />*/}
          {/*</Box>*/}
          {/*<Box className={styles.logoWrapperDesktop}>*/}
          {/*  <DesktopLogo className={styles.logoDesktop} aria-label="Betera" />*/}
          {/*</Box>*/}
          <MenuItem component="div" className={styles.userRole}>
            <Typography className={styles.userRoleText}>{displayRole}</Typography>
          </MenuItem>
          <Box className={styles.avatarWrapper}>
            <IconButton onClick={handleOpenUserMenu} className={styles.avatarButton}>
              <Avatar user={user} size={40} />
            </IconButton>
            <DropdownUser anchorElUser={anchorElUser} setAnchorElUser={setAnchorElUser} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
