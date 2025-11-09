import { z } from 'zod'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const MIN_WIDTH = 640
const MIN_HEIGHT = 640

const checkImageDimensions = (file: File): Promise<boolean> => {
  return new Promise(resolve => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img.width >= MIN_WIDTH && img.height >= MIN_HEIGHT)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(false)
    }

    img.src = url
  })
}

export const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine(file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type), {
    message: 'Допустимые форматы: JPG, PNG, WEBP',
  })
  .refine(file => file.size <= MAX_FILE_SIZE, {
    message: 'Размер файла не должен превышать 10 МБ',
  })
  .refine(async file => await checkImageDimensions(file), {
    message: `Минимальный размер изображения: ${MIN_WIDTH}×${MIN_HEIGHT} пикселей`,
  })
