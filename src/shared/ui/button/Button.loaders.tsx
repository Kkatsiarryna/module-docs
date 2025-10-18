import { CircularProgress } from '@mui/material'

// Один универсальный лоадер, который меняет только цвет
const createLoader = (color: string) => <CircularProgress size={16} sx={{ color }} />

// Лоадеры для каждого типа кнопки
export const Loaders = {
  primary: createLoader('var(--text-light)'), // Белый на синей кнопке
  secondary: createLoader('var(--accent-active)'), // Синий на серой кнопке
  outlined: createLoader('var(--accent-active)'), // Синий на прозрачной
  ghost: createLoader('var(--text-dark)'), // Темный на прозрачной
}
