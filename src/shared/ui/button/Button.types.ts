import { type ButtonProps as MuiButtonProps } from '@mui/material'

// Вместо 13 сложных вариантов делаем 4 простых
export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost'

// Размеры вместо фиксированных ширины/высоты
export type ButtonSize = 'small' | 'medium' | 'large'

export type ButtonWidth = 'auto' | 'full'

// Простые пропсы для нашей кнопки
export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant // Тип кнопки
  size?: ButtonSize // Размер
  loading?: boolean // Загрузка
  icon?: React.ReactNode // Иконка (любая!)
  iconPosition?: 'start' | 'end' // Где иконка
  width?: ButtonWidth
  // ДОБАВЛЯЕМ: максимальная ширина для авторежима
  maxWidth?: string | number
}
