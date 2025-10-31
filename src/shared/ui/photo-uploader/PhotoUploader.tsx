import Box from '@mui/material/Box'
import styles from './PhotoUploader.module.scss'
import { type ChangeEvent, type MouseEvent, useEffect, useRef, useState } from 'react'
import { LoadersMedium, Typography } from '@shared/ui'
import IconButton from '@mui/material/IconButton'
import { useFileValidation } from '@shared/model/validation'
import { IMAGE_SCHEMA } from '@shared/ui/photo-uploader/image.schema.ts'
import { ICONS } from '@shared/ui'
import clsx from 'clsx'

type PhotoUploader = {
  disabled?: boolean
  onFileSelect?: (file: File | null) => void
}

export const PhotoUploader = ({ disabled = false, onFileSelect }: PhotoUploader) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { error, validateFile } = useFileValidation()

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [selectedFile])

  const resetImage = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    onFileSelect?.(null)
  }

  const handleImgChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    if (!file) return

    setIsLoading(true)
    const isValid = validateFile(file, IMAGE_SCHEMA)

    if (isValid) {
      setSelectedFile(file)
      onFileSelect?.(file)
    } else resetImage()

    setIsLoading(false)
  }

  const handleClick = () => {
    if (!disabled && !selectedFile) {
      fileInputRef.current?.click()
    }
  }

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    resetImage()
  }

  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const renderLoader = () => (
    <Box className={styles.loaderOverlay}>
      <Box className={styles.loaderIcon}>{LoadersMedium.ghost}</Box>
    </Box>
  )

  const renderPreview = () => (
    <>
      <img src={previewUrl} alt="preview" className={styles.previewImage} />
      <Box className={styles.buttonsIcon}>
        <IconButton onClick={handleEdit} className={styles.iconButton}>
          <ICONS.EDIT className={styles.editIcon} />
        </IconButton>
        <IconButton onClick={handleDelete} className={styles.iconButton}>
          <ICONS.BASKET className={styles.deleteIcon} />
        </IconButton>
      </Box>
    </>
  )

  const renderPlaceholder = () => (
    <>
      <ICONS.PHOTO_FILLED className={styles.photoIcon} />
      <Typography variant={'bodyS'} className={clsx({ [styles.textDisabled]: disabled })}>
        Загрузить фото
      </Typography>
    </>
  )

  return (
    <Box
      className={clsx(styles.photoUploader, {
        [styles.errorBorder]: !!error,
        [styles.disabled]: disabled,
      })}
      onClick={handleClick}
    >
      {isLoading ? renderLoader() : previewUrl ? renderPreview() : renderPlaceholder()}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImgChange}
        disabled={disabled}
      />
    </Box>
  )
}
