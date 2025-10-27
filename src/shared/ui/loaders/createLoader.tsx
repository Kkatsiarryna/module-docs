import { CircularProgress } from '@mui/material'

export const createLoader = (color: string, size: number) => (
  <CircularProgress size={size} sx={{ color }} />
)