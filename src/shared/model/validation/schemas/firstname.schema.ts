import { z } from 'zod'

const firstnameRegex = /^(?!.*--)(?!.*\s\s)[A-Za-zА-Яа-яЁё]+([-\s][A-Za-zА-Яа-яЁё]+)*$/

export const FIRSTNAME_SCHEMA = z
  .string()
  .min(1, { message: 'Поле "Имя" не должно быть пустым' })
  .max(255, { message: 'Имя не должно превышать 255 символов' })
  .regex(firstnameRegex, { message: 'Недопустимые символы' })
