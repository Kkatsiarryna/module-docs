import Box from '@mui/material/Box'
import styles from './PhotoUploader.module.scss'
import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import PhotoIcon from '@shared/assets/icons/filled/photo.svg?react'
import DeleteIcon from '@shared/assets/icons/outlined/delete.svg?react'
import ZoomInIcon from '@icons/outlined/zoom in.svg?react'
import { Typography } from '@shared/ui'
import IconButton from '@mui/material/IconButton'

export const PhotoUploader = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imgFile, setImgFile] = useState<File | undefined>()
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    if (imgFile) {
      const url = URL.createObjectURL(imgFile)
      setImgUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [imgFile])

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImgFile(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDelete = () => {}

  return (
    <Box className={styles.photoUploader} onClick={handleClick}>
      {imgUrl ? (
        <>
          <img src={imgUrl} alt="preview" className={styles.previewImage} />
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
        onChange={handleImgChange}
      />
    </Box>
  )
}
