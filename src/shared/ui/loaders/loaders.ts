import { SIZES_ICON } from '@shared/ui/icons/icons'
import { CreateLoader } from './CreateLoader'

export const LoadersSmall = {
  primary: CreateLoader('var(--text-light)', SIZES_ICON.SMALL), // Белый на синей кнопке
  secondary: CreateLoader('var(--accent-active)', SIZES_ICON.SMALL), // Синий на серой кнопке
  outlined: CreateLoader('var(--accent-active)', SIZES_ICON.SMALL), // Синий на прозрачной
  ghost: CreateLoader('var(--text-dark)', SIZES_ICON.SMALL), // Темный на прозрачной
}

export const LoadersMedium = {
  primary: CreateLoader('var(--text-light)', SIZES_ICON.MEDIUM), // Белый на синей кнопке
  secondary: CreateLoader('var(--accent-active)', SIZES_ICON.MEDIUM), // Синий на серой кнопке
  outlined: CreateLoader('var(--accent-active)', SIZES_ICON.MEDIUM), // Синий на прозрачной
  ghost: CreateLoader('var(--text-dark)', SIZES_ICON.MEDIUM), // Темный на прозрачной
}

export const LoadersSmallest = {
  primary: CreateLoader('var(--text-light)', SIZES_ICON.SMALLEST), // Белый на синей кнопке
  secondary: CreateLoader('var(--accent-active)', SIZES_ICON.SMALLEST), // Синий на серой кнопке
  outlined: CreateLoader('var(--accent-active)', SIZES_ICON.SMALLEST), // Синий на прозрачной
  ghost: CreateLoader('var(--text-dark)', SIZES_ICON.SMALLEST), // Темный на прозрачной
}
