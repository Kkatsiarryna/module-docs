import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import { type ChangeEvent, type ReactNode, useEffect, useId, useState } from 'react'
import EyeIcon from '@icons/outlined/eye.svg?react'
import EyeClosedIcon from '@icons/outlined/eye_closed.svg?react'
import Box from '@mui/material/Box'

type InputSize = 'M' | 'XS'
type Props = Omit<MuiTextFieldProps, 'size'> & {
  className?: string
  size?: InputSize
  endIcon?: ReactNode
  maxLength?: number
  showCharacterCount?: boolean
}

export const Input = ({
  className,
  id,
  size = 'M',
  value,
  label,
  endIcon,
  maxLength,
  showCharacterCount = false,
  onChange,
  type,
  ...rest
}: Props) => {
  const defaultId = useId()
  const idCurrent = id ?? defaultId

  const [characterCount, setCharacterCount] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (typeof value === 'string') {
      setCharacterCount(value.length)
    } else if (value == null) {
      setCharacterCount(0)
    }
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCharacterCount(event.target.value.length)
    onChange?.(event)
  }

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev)
  }

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

  const passwordEndIcon =
    type === 'password' ? (
      <Box onClick={handleTogglePassword}>{showPassword ? <EyeIcon /> : <EyeClosedIcon />}</Box>
    ) : (
      endIcon
    )

  const computedLabel =
    showCharacterCount && maxLength ? `${label ?? ''} ${characterCount}/${maxLength}` : label

  return (
    <MuiTextField
      id={idCurrent}
      className={className}
      value={value}
      onChange={handleChange}
      label={computedLabel}
      size={size === 'XS' ? 'small' : 'medium'}
      type={inputType}
      slotProps={{
        input: {
          endAdornment: passwordEndIcon,
          inputProps: { maxLength },
        },
      }}
      {...rest}
    />
  )
}
