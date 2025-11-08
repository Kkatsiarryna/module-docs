import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'
import { Header } from '@shared/ui'
import styles from './AppLayout.module.scss'
import type { ReactNode } from 'react'
import { Sidebar } from '@widgets/sidebar/ui/Sidebar.tsx'

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
        <Box className={styles.content}>{children}</Box>
      </Box>
    </Box>
  )
}
