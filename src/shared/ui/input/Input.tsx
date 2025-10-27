import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import {
  type ChangeEvent,
  type FocusEvent,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from 'react'
import { ICONS } from '@shared/ui'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

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
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setCharacterCount(typeof value === 'string' ? value.length : 0)
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCharacterCount(newValue.length)
    onChange?.(event)
  }

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const currentValue = event.target.value
    if (!currentValue || currentValue.trim().length === 0) {
      setShowPassword(false)
    }
    setIsFocused(false)
  }

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

  const shouldShowPasswordIcon = type === 'password' && (isFocused || characterCount > 0)

  const passwordEndAdornment = shouldShowPasswordIcon ? (
    <InputAdornment position="end">
      <IconButton onClick={handleTogglePassword} edge="end">
        {showPassword ? <ICONS.EYE /> : <ICONS.EYE_CLOSED />}
      </IconButton>
    </InputAdornment>
  ) : endIcon ? (
    <InputAdornment position="end">{endIcon}</InputAdornment>
  ) : null

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
          endAdornment: passwordEndAdornment,
          inputProps: { maxLength },
          onBlur: handleBlur,
          onFocus: () => setIsFocused(true),
        },
      }}
      {...rest}
    />
  )
}
