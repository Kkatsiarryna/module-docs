import { Button as MuiButton, type ButtonProps } from '@mui/material'
import { LoadersSmall } from '../../../types/index'

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost';

  declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
      primary: true
      secondary: true
      outlined: true
      ghost: true
    }
  }

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
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
    <MuiButton
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
    </MuiButton>
  )
}