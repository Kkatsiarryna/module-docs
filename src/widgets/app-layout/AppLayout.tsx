import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'
import { Header } from '@shared/ui'
import styles from './AppLayout.module.scss'
import type { ReactNode } from 'react'
import { Sidebar } from '@widgets/sidebar/Sidebar'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation()
  const isHideHeader = ['/', '/login', '/confirm-password'].includes(pathname)

  return (
    <Box className={styles.appLayout}>
      {!isHideHeader && <Header />}
      <Box className={styles.mainContent}>
        {!isHideHeader && (
          <Box className={styles.sidebarWrapper}>
            <Sidebar></Sidebar>
          </Box>
        )}
        <Box
          className={styles.content}
          sx={{ width: { xs: '40%', sm: '50%', md: '60%', lg: '70%', xl: '80%' } }}
          // sx={{ width: '80vh' }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
