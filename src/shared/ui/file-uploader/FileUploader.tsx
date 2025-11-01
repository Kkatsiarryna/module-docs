import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import { ICONS, Typography } from '@shared/ui'
import { type ChangeEvent, type MouseEvent, useRef, useState } from 'react'
import { DOCUMENT_SCHEMA } from '@shared/model/validation'
import { useFileValidation } from '@shared/model/validation'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import styles from './FileUploader.module.scss'

type Props = Omit<MuiTextFieldProps, 'size'> & {
  className?: string
  onFileSelect?: (file: File | null) => void
}

export const FileUploader = ({ className, onFileSelect, ...rest }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { error, validateFile } = useFileValidation()

  const resetFile = () => {
    onFileSelect?.(null)
    setSelectedFile(null)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    if (!file) {
      resetFile()
      return
    }

    const isValid = validateFile(file, DOCUMENT_SCHEMA)
    if (isValid) {
      onFileSelect?.(file)
      setSelectedFile(file)
    } else {
      resetFile()
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleClick = () => {
    if (!selectedFile) {
      fileInputRef.current?.click()
    }
  }

  const handleRemoveFile = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    resetFile()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const CustomFileInput = () => {
    return (
      <Box className={styles.wrapper}>
        <Typography variant="bodyS">{selectedFile ? 'Добавлен файл' : 'Добавить файл'}</Typography>
        {selectedFile && (
          <Typography className={styles.fileName} title={selectedFile.name}>
            {selectedFile.name}
          </Typography>
        )}
      </Box>
    )
  }

  const endAdornment = selectedFile ? (
    <IconButton onClick={handleRemoveFile}>
      <ICONS.CLOSE />
    </IconButton>
  ) : (
    <ICONS.UPLOAD />
  )

  return (
    <>
      <MuiTextField
        className={className}
        onClick={handleClick}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: endAdornment,
            inputComponent: CustomFileInput,
          },
        }}
        {...rest}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={'.pdf'}
        style={{ display: 'none' }}
      />
    </>
  )
}
