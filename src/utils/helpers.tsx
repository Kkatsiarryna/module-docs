import { CircularProgress } from '@mui/material'
import { SvgIcon, type SvgIconProps } from '@mui/material'

// eslint-disable-next-line react-refresh/only-export-components
export const createLoader = (color: string, size: number) => (
  <CircularProgress size={size} sx={{ color }} />
)

interface IconProps extends SvgIconProps {
  size?: number
  paddingLeft?: number
  paddingRight?: number
  padding?: number
}

export const Icon: React.FC<IconProps> = ({ size, padding = 0, paddingLeft = 0, paddingRight = 0, sx, ...props }) => {
  return (
    <SvgIcon
      sx={{
        fontSize: size,
        width: size,
        height: size,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        padding: padding,
        ...sx,
      }}
      {...props}
    />
  )
}