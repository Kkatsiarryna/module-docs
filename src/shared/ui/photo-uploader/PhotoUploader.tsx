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
}

export const PhotoUploader = ({ disabled = false }: PhotoUploader) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const [previewUrl, setPreviewUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { error, validateFile } = useFileValidation()
  const hasError = Boolean(error.photo)

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [selectedFile])

  const resetImage = () => {
    setSelectedFile(undefined)
    setPreviewUrl('')
  }

  const handleImgChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    setIsLoading(true)
    const isValid = validateFile(file, IMAGE_SCHEMA, 'photo')

    if (isValid) setSelectedFile(file)
    else resetImage()

    setIsLoading(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    resetImage()
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
        <IconButton onClick={handleDelete} className={styles.iconButton}>
          <ICONS.BASKET className={styles.deleteIcon} />
        </IconButton>
        <IconButton className={styles.iconButton}>
          <ICONS.ZOOM_IN className={styles.zoomInIcon} />
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
        [styles.errorBorder]: hasError,
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
