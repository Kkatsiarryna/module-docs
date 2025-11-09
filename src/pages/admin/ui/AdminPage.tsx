import { useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { TableTemplate } from '@widgets/table/ui/table/Table'
import { usersColumns } from '@widgets/table/model/types'
import Box from '@mui/material/Box'
import { Button, InputSearch, Typography } from '@shared/ui'
import styles from './AdminPage.module.scss'
import { useAdminPage } from '@pages/admin/model'
import { AddUserForm } from '@features/user-management/ui'

export const AdminPage = () => {
  const {
    isAddUserModalOpen,
    openAddUserModal,
    closeAddUserModal,
    page,
    setPage,
    rowsPerPage,
    items,
    totalCount,
    isLoading,
  } = useAdminPage()

  const [selected, setSelected] = useState<string[]>([])

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
        <Typography variant={'heading1'} className={styles.title}>
          Администрирование
        </Typography>
        <Box className={styles.controls}>
          <InputSearch className={styles.search} />
          <Button variant={'primary'} className={styles.addButton} onClick={openAddUserModal}>
            + Добавить пользователя
          </Button>
        </Box>

        <TableTemplate
          type="users"
          columns={usersColumns}
          items={items}
          totalCount={totalCount}
          isLoading={isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          selected={selected}
          setSelected={setSelected}
        />

        {isAddUserModalOpen && (
          <AddUserForm onClose={closeAddUserModal} open={isAddUserModalOpen} />
        )}
      </Paper>
    </Grid>
  )
}
