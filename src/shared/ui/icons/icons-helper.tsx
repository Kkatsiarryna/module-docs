import { SvgIcon, type SvgIconProps } from '@mui/material'

interface IconProps extends SvgIconProps {
  size?: number
  paddingLeft?: number
  paddingRight?: number
  padding?: number
}

export const Icon: React.FC<IconProps> = ({
  size,
  padding = 0,
  paddingLeft = 0,
  paddingRight = 0,
  sx,
  ...props
}) => {
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
