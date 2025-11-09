import Box from '@mui/material/Box'
import styles from './PhotoUploader.module.scss'
import { type ChangeEvent, type MouseEvent, useEffect, useRef, useState } from 'react'
import { LoadersMedium, Typography } from '@shared/ui'
import IconButton from '@mui/material/IconButton'
import { useFileValidation } from '@shared/model/validation'
import { IMAGE_SCHEMA } from '@shared/model/validation'
import { ICONS } from '@shared/ui'
import clsx from 'clsx'
import { useToast } from '@app/providers/toast'

type PhotoUploader = {
  disabled?: boolean
  onFileSelect?: (file: File | null) => void
  onDeleteClick?: () => void
  currentImage?: string | null
}

export const PhotoUploader = ({
  disabled = false,
  onFileSelect,
  onDeleteClick,
  currentImage,
}: PhotoUploader) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()
  const { error, validateFile } = useFileValidation()

  const displayUrl = previewUrl || currentImage || ''

  useEffect(() => {
    setPreviewUrl(currentImage || '')
  }, [currentImage])

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleImgChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    if (!file) return

    setIsLoading(true)
    const isValid = await validateFile(file, IMAGE_SCHEMA)

    if (isValid) {
      onFileSelect?.(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      onFileSelect?.(null)
      showToast('Недопустимый файл', 'error')
    }

    setIsLoading(false)
  }

  const handleClick = () => {
    if (!disabled && !isLoading) {
      fileInputRef.current?.click()
    }
  }

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDeleteClick?.()
    setPreviewUrl('')
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
      {isLoading ? renderLoader() : displayUrl ? renderPreview() : renderPlaceholder()}
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
