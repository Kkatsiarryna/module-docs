import { z } from 'zod'

const emailRegex =
  /^[a-zA-Z0-9._+-]+(?:\.[a-zA-Z0-9._+-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Введите Email')
    .max(250, 'Максимальная длина — 250 символов')
    .regex(emailRegex, 'Невалидный Email'),

  password: z.string().min(1, 'Введите пароль'),
})

// Тип для useForm
export type LoginCredentials = z.infer<typeof loginSchema>
