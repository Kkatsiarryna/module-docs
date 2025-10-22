import { z } from 'zod'

const emailRegex =
  /^(?!\.)(?!.*\.\.)([a-zA-Z0-9._+-]+)(?<!\.)@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/

const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{6,30}$/

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Введите Email')
    .max(250, 'Максимальная длина — 250 символов')
    .regex(emailRegex, 'Невалидный Email'),

  password: z
    .string()
    .min(6, 'Минимальная длина — 6 символов')
    .max(30, 'Максимальная длина — 30 символов')
    .regex(passwordRegex, 'Пароль не соответствует требованиям'),
})

export type LoginCredentials = z.infer<typeof loginSchema>
