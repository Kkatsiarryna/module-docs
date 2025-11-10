import Box from '@mui/material/Box'
import { Header } from '@shared/ui'
import styles from './AppLayout.module.scss'
import type { ReactNode } from 'react'
import { Grid } from '@mui/system'
import { Sidebar } from '@widgets/sidebar/ui/Sidebar.tsx'
import { useAppLayout } from '@widgets/app-layout/model'
import clsx from 'clsx'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user, isHideHeader } = useAppLayout()
  return (
    <Box className={clsx(styles.appLayout, isHideHeader && styles.appLayoutNoHeader)}>
      {!isHideHeader && user && <Header user={user} />}
      <Box className={styles.mainContent}>
        {!isHideHeader && (
          <Box className={styles.sidebarWrapper}>
            <Sidebar></Sidebar>
          </Box>
        )}
        <Grid className={styles.content}>{children}</Grid>
      </Box>
    </Box>
  )
}
