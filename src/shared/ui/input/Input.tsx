import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import { type ChangeEvent, type ReactNode, useEffect, useId, useState } from 'react'

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
  ...rest
}: Props) => {
  const defaultId = useId()
  const idCurrent = id ?? defaultId

  const [characterCount, setCharacterCount] = useState(0)

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

  const computedLabel =
    showCharacterCount && maxLength ? `${label ?? ''} ${characterCount}/${maxLength}     ` : label

  return (
    <MuiTextField
      id={idCurrent}
      className={className}
      value={value}
      onChange={handleChange}
      label={computedLabel}
      size={size === 'XS' ? 'small' : 'medium'}
      slotProps={{
        input: {
          endAdornment: endIcon,
          inputProps: { maxLength },
        },
      }}
      {...rest}
    />
  )
}
