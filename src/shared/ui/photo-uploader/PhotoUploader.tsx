import Box from '@mui/material/Box'
import styles from './PhotoUploader.module.scss'
import { type ChangeEvent, useRef, useState } from 'react'
import PhotoIcon from '@shared/assets/icons/filled/photo.svg?react'
import DeleteIcon from '@shared/assets/icons/outlined/delete.svg?react'
import ZoomInIcon from '@icons/outlined/zoom in.svg?react'
import { Typography } from '@shared/ui'
import IconButton from '@mui/material/IconButton'

export const PhotoUploader = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDelete = () => {}

  return (
    <Box className={styles.photoUploader} onClick={handleClick}>
      {preview ? (
        <>
          <img src={preview} alt="preview" className={styles.previewImage} />
          <Box className={styles.buttonsIcon}>
            <IconButton onClick={handleDelete} className={styles.iconButton}>
              <DeleteIcon className={styles.deleteIcon} />
            </IconButton>
            <IconButton className={styles.iconButton}>
              <ZoomInIcon className={styles.zoomInIcon} />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <PhotoIcon className={styles.photoIcon} />
          <Typography variant={'bodyS'}>Загрузить фото</Typography>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  )
}
