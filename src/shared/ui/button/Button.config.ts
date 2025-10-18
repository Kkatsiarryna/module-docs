import { type ButtonVariant, type ButtonSize, type ButtonWidth } from './Button.types'

// ОБЩИЕ стили для ВСЕХ кнопок
const baseStyles = {
  borderRadius: '12px',
  fontFamily: 'var(--font-family)',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '129%',
  textAlign: 'center',
  justifyContent: 'center',
  boxShadow: 'none',
  minWidth: '40px',
  textTransform: 'none' as const, // Убираем ВСЕГДА uppercase
  display: 'flex',
  alignItems: 'center',
  gap: '8px', // Отступ между иконкой и текстом
  transition: 'all 0.2s ease-in-out', // Плавные анимации
  '&:hover': {
    boxShadow: 'none',
  },
}

// РАЗМЕРЫ - вместо фиксированных width/height
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sizeStyles: Record<ButtonSize, any> = {
  small: {
    padding: '8px 16px', // Увеличиваем отступы для лучшего вида
    height: '36px',
    minWidth: '80px', // Минимальная ширина для всех кнопок
  },
  medium: {
    padding: '8px 20px',
    height: '40px',
    minWidth: '100px',
  },
  large: {
    padding: '12px 24px',
    height: '44px',
    minWidth: '120px',
    fontSize: '15px',
  },
}

// ШИРИНЫ - ПРОСТАЯ СИСТЕМА
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const widthStyles: Record<ButtonWidth, any> = {
  'auto': {
    width: 'fit-content', // 🔥 Ключевое изменение - подстраивается под контент!
    minWidth: 'auto',     // Но соблюдает minWidth из sizeStyles
  },
  'full': {
    width: '100%', // На всю ширину
  },
}

// МАКСИМАЛЬНЫЕ ШИРИНЫ для разных типов кнопок
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const maxWidthStyles: Record<ButtonVariant, any> = {
  primary: {
    maxWidth: '420px', // Самая большая кнопка (авторизация)
  },
  secondary: {
    maxWidth: '200px', // Средние кнопки
  },
  outlined: {
    maxWidth: '163px', // Кнопки отказа
  },
  ghost: {
    maxWidth: '193px', // Прозрачные кнопки
  },
}

// ЦВЕТА и СОСТОЯНИЯ для каждого типа кнопки
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const variantStyles: Record<ButtonVariant, any> = {
  primary: {
    backgroundColor: 'var(--accent-default)',
    color: 'var(--text-light)',
    '&:hover': {
      backgroundColor: 'var(--accent-hover)',
      boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
    },
    '&:active': {
      backgroundColor: 'var(--accent-active)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'var(--accent-disabled)',
      color: 'var(--text-disabled-light)',
    },
  },
  secondary: {
    backgroundColor: 'var(--secondary-default)',
    color: 'rgba(63, 65, 214, 0.4)',
    '&:hover': {
      backgroundColor: 'var(--secondary-hover)',
      boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
    },
    '&:active': {
      backgroundColor: 'var(--secondary-active)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'var(--secondary-default)',
      color: 'rgba(63, 65, 214, 0.4)',
    },
  },
  outlined: {
    border: '1px solid var(--divider-default)',
    backgroundColor: 'transparent',
    color: 'var(--text-dark)',
    '&:hover': {
      boxShadow: '2px 2px 10px 0 rgba(54, 50, 47, 0.1)',
      backgroundColor: 'transparent',
    },
    '&:active': {
      backgroundColor: 'var(--tertiary-focused)',
    },
    '&.Mui-disabled': {
      border: '1px solid var(--divider-default)',
      color: 'var(--text-disabled-dark)',
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--text-dark)',
    '&:hover': {
      backgroundColor: 'var(--background-surface-2)',
      color: 'var(--accent-hover)',
      '& svg': { fill: 'var(--accent-hover)' }, // Меняем цвет иконки при hover
    },
    '&:active': {
      color: 'var(--accent-hover)',
      backgroundColor: 'transparent',
    },
    '&.Mui-disabled': {
      color: 'var(--text-disabled-dark)',
    },
  },
}

// УМНАЯ функция получения стилей
export const getButtonStyles = (
  variant: ButtonVariant, 
  size: ButtonSize, 
  width: ButtonWidth,
  maxWidth?: string | number // Дополнительная максимальная ширина
) => ({
  ...baseStyles,
  ...variantStyles[variant],
  ...sizeStyles[size],
  ...widthStyles[width],
  ...maxWidthStyles[variant], // Автоматическая максимальная ширина по типу
  ...(maxWidth && { maxWidth }), // Если передали кастомную maxWidth - используем её
})
