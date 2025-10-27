import { SIZES_ICON } from '@shared/ui/icons/icons'
import { createLoader } from './createLoader'

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
