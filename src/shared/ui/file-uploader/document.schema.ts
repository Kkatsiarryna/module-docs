import { z } from 'zod'

const MAX_FILE_SIZE = 20 * 1024 * 1024

export const DOCUMENT_SCHEMA = z
  .instanceof(File)
  .refine(file => file.type === 'application/pdf', {
    message: 'Допустимый формат: PDF',
  })
  .refine(file => file.size <= MAX_FILE_SIZE, {
    message: 'Размер файла не должен превышать 20 МБ',
  })
