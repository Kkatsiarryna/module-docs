import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import { type ChangeEvent, useEffect, useId, useState } from 'react'
import { ICONS } from '@shared/ui'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

type Props = Omit<MuiTextFieldProps, 'label'> & {
  className?: string
  onClear?: () => void
}

export const InputSearch = ({ className, id, value, onChange, onClear, ...rest }: Props) => {
  const defaultId = useId()
  const idCurrent = id ?? defaultId

  const [inputValue, setInputValue] = useState<string>(String(value ?? ''))

  useEffect(() => {
    setInputValue(String(value ?? ''))
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    onChange?.(event)
  }

  const handleClear = () => {
    setInputValue('')
    onClear?.()
    onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
  }

  const startAdornmentIcon = (
    <InputAdornment position="start">
      <ICONS.SEARCH />
    </InputAdornment>
  )
  const endAdornmentIcon = inputValue ? (
    <InputAdornment position="end">
      <IconButton onClick={handleClear} edge="end">
        <ICONS.CLOSE />
      </IconButton>
    </InputAdornment>
  ) : null

  return (
    <MuiTextField
      id={idCurrent}
      className={`search-input ${className ?? ''}`}
      value={inputValue}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: startAdornmentIcon,
          endAdornment: endAdornmentIcon,
        },
      }}
      {...rest}
    />
  )
}
