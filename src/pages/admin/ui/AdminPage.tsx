import { Grid, Paper } from '@mui/material'
import Box from '@mui/material/Box'
import { Button, InputSearch, Typography } from '@shared/ui'
import styles from './AdminPage.module.scss'
import { useAdminPage } from '@pages/admin/model'
import { AddUserForm } from '@features/user-management/ui'
import { UsersTable } from '@widgets/users-table/ui'

export const AdminPage = () => {
  const { isAddUserModalOpen, openAddUserModal, closeAddUserModal } = useAdminPage()

  return (
    <Grid
      size={12}
      sx={{
        px: { xs: 2, md: 4, xl: 6 },
        pb: { xs: 4, md: 6 },
        pt: { xs: 2, md: 3 },
      }}
      className={styles.adminPage}
    >
      <Paper elevation={0} className={styles.userTable}>
        <Typography variant={'heading2'} className={styles.title}>
          Администрирование
        </Typography>
        <Box className={styles.controls}>
          <InputSearch className={styles.search} />
          <Button variant={'primary'} className={styles.addButton} onClick={openAddUserModal}>
            + Добавить пользователя
          </Button>
        </Box>
        <UsersTable />
        {isAddUserModalOpen && (
          <AddUserForm onClose={closeAddUserModal} open={isAddUserModalOpen} />
        )}
      </Paper>
    </Grid>
  )
}
