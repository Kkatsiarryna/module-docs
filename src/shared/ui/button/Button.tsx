import LoadingButton, { type LoadingButtonProps } from '@mui/lab/LoadingButton'
import { LoadersSmall } from '../loaders/loaders'

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost';

  declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
      primary: true
      secondary: true
      outlined: true
      ghost: true
    }
  }

  const ButtonsType = {
    PRIMARY: { value: 'primary', label: 'Primary Button' },
    SECONDARY: { value: 'secondary', label: 'Secondary Button' },
    OUTLINED: { value: 'outlined', label: 'Outlined Button' },
    GHOST: { value: 'ghost', label: 'Ghost Button' },
  } as const

  export type ButtonsType = (typeof ButtonsType)[keyof typeof ButtonsType]['value']

interface CustomButtonProps extends Omit<LoadingButtonProps, 'variant'> {
  variant: ButtonVariant
  loading?: boolean
  loadingPosition?: 'start' | 'end'
  isIcon?: boolean
  maxWidth?: number | string
}


export const Button: React.FC<CustomButtonProps> = ({
  children,
  variant,
  disabled,
  loading = false,
  isIcon,
  maxWidth,
  loadingPosition,
  sx,
  ...props
}) => {
  const isDisabled = disabled || loading

  const renderContent = () => {
        return LoadersSmall[variant]
  }

  return (
    <LoadingButton
      variant={variant}
      disabled={isDisabled}
      loading={loading}
      loadingIndicator={renderContent()}
      loadingPosition={loadingPosition}
      sx={{
        ...(maxWidth && { maxWidth }), 
        ...sx,
      }}
      {...props}
    >
      {loading ? (isIcon ? children : '') : children}
    </LoadingButton>
  )
}