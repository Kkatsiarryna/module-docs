import { z } from 'zod'

const lastnameRegex = /^(?!.*--)(?!.*\s\s)[A-Za-zА-Яа-яЁё]+([-\s][A-Za-zА-Яа-яЁё]+)*$/

export const LASTNAME_SCHEMA = z
  .string()
  .min(1, { message: 'Поле "Фамилия" не должно быть пустым' })
  .max(255, { message: 'Фамилия не должна превышать 255 символов' })
  .regex(lastnameRegex, { message: 'Недопустимые символы' })
