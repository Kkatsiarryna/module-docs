import { CircularProgress } from '@mui/material'

export const CreateLoader = (color: string, size: number) => (
  <CircularProgress size={size} sx={{ color }} />
)
