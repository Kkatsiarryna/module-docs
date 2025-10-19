import { SIZES_ICON } from '@shared/constants/icons'
import { createLoader } from '../utils/helpers'

export const LoadersSmall = {
  primary: createLoader('var(--text-light)', SIZES_ICON.SMALL), // Белый на синей кнопке
  secondary: createLoader('var(--accent-active)', SIZES_ICON.SMALL), // Синий на серой кнопке
  outlined: createLoader('var(--accent-active)', SIZES_ICON.SMALL), // Синий на прозрачной
  ghost: createLoader('var(--text-dark)', SIZES_ICON.SMALL), // Темный на прозрачной
}

export const LoadersMedium = {
  primary: createLoader('var(--text-light)', SIZES_ICON.MEDIUM), // Белый на синей кнопке
  secondary: createLoader('var(--accent-active)', SIZES_ICON.MEDIUM), // Синий на серой кнопке
  outlined: createLoader('var(--accent-active)', SIZES_ICON.MEDIUM), // Синий на прозрачной
  ghost: createLoader('var(--text-dark)', SIZES_ICON.MEDIUM), // Темный на прозрачной
}

export const LoadersSmallest = {
  primary: createLoader('var(--text-light)', SIZES_ICON.SMALLEST), // Белый на синей кнопке
  secondary: createLoader('var(--accent-active)', SIZES_ICON.SMALLEST), // Синий на серой кнопке
  outlined: createLoader('var(--accent-active)', SIZES_ICON.SMALLEST), // Синий на прозрачной
  ghost: createLoader('var(--text-dark)', SIZES_ICON.SMALLEST), // Темный на прозрачной
}

const ButtonsType = {
  PRIMARY: { value: 'primary', label: 'Primary Button' },
  SECONDARY: { value: 'secondary', label: 'Secondary Button' },
  OUTLINED: { value: 'outlined', label: 'Outlined Button' },
  GHOST: { value: 'ghost', label: 'Ghost Button' },
} as const

export type ButtonsType = (typeof ButtonsType)[keyof typeof ButtonsType]['value']