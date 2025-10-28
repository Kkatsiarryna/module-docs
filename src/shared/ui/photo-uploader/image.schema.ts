import { z } from 'zod'

const MAX_FILE_SIZE = 10 * 1024 * 1024
// const MIN_WIDTH = 640;
// const MIN_HEIGHT = 640;

export const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine(file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type), {
    message: 'Допустимые форматы: JPG, PNG, WEBP',
  })  .refine(file => file.size <= MAX_FILE_SIZE, {
    message: 'Размер файла не должен превышать 10 МБ',
  })

