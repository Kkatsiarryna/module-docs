import { Select } from '@shared/ui'
import { rolesUsersArray } from '@shared/model/user'
import type { GridRenderCellParams } from '@mui/x-data-grid'
import Box from '@mui/material/Box'

export const RoleCell = ({ params }: { params: GridRenderCellParams }) => {
  const { id, field, value, api } = params

  const handleChange = (newValue: string) => {
    api.updateRows([{ id, [field]: newValue }])
  }

  return (
    <Box
      style={{
        width: '100%',
        height: '24px',
        fontSize: '12px',
        lineHeight: '133%',
        // height: '50%',
        //padding: '12px 8px',
      }}
    >
      <Select
        placeholder="Роль"
        value={value}
        selectItems={rolesUsersArray}
        onChange={handleChange}
        size="small"
      />
    </Box>
  )
}
