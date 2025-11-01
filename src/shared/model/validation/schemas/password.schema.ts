import { z } from 'zod'

const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{6,30}$/

export const PASSWORD_SCHEMA = z
  .string()
  .min(6, 'Пароль не соответствует требованиям')
  .max(30, 'Пароль не соответствует требованиям')
  .regex(passwordRegex, 'Пароль не соответствует требованиям')
