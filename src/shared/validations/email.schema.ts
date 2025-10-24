import { z } from 'zod'

const emailRegex =
  /^(?!\.)(?!.*\.\.)([a-zA-Z0-9._+-]+)(?<!\.)@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/

export const emailSchema = z
  .string()
  .min(1, 'Введите Email')
  .max(250, 'Максимальная длина — 250 символов')
  .regex(emailRegex, 'Невалидный Email')
