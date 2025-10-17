import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import clsx from 'clsx'
import { type ChangeEvent, useEffect, useId, useState } from 'react'
import styles from './Input.module.scss'

type InputSize = 'M' | 'XS'
type Props = Omit<MuiTextFieldProps, 'size'> & {
  className?: string
  size?: InputSize
  maxLength?: number
  showCharacterCount?: boolean
}

export const Input = ({
  className,
  id,
  size = 'M',
  maxLength,
  showCharacterCount = false,
  value,
  onChange,
  label,
  ...rest
}: Props) => {
  const defaultId = useId()
  const idCurrent = id || defaultId
  const textFieldClasses = clsx(styles.textField, styles[`size${size}`], className)

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

  const CustomLabel = () => (
    <div className={styles.customLabel}>
      <span className={styles.labelText}>{label}</span>
      {showCharacterCount && maxLength && (
        <span className={styles.characterCounter}>
          {characterCount}/{maxLength}
        </span>
      )}
    </div>
  )

  return (
    <MuiTextField
      className={textFieldClasses}
      value={value}
      onChange={handleChange}
      slotProps={{
        input: {
          classes: {
            root: styles.inputRoot,
            focused: styles.inputFocused,
            notchedOutline: styles.notchedOutline,
            error: styles.inputError,
            disabled: styles.disabledInput,
          },
        },
        formHelperText: {
          classes: {
            root: styles.formHelperTextRoot,
            error: styles.formHelperTextError,
          },
        },
        inputLabel: {
          classes: {
            root: styles.inputLabelRoot,
            focused: styles.inputLabelFocused,
            error: styles.inputLabelError,
            disabled: styles.inputLabelDisabled,
            shrink: styles.inputLabelShrink,
          },
        },
      }}
      label={label ? <CustomLabel /> : undefined}
      id={idCurrent}
      {...rest}
    />
  )
}
