import Box from '@mui/material/Box'
import { Button, InputSearch, Typography } from '@shared/ui'
import styles from './AdminPage.module.scss'

export const AdminPage = () => {
  return (
    <div className={styles.adminPage}>
      <Typography variant={'heading1'} className={styles.title}>
        Администрирование
      </Typography>
      <Box className={styles.controls}>
        <InputSearch className={styles.search} />
        <Button variant={'primary'} className={styles.addButton}>
          + Добавить пользователя
        </Button>
      </Box>
    </div>
  )
}
