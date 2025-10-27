import { z } from 'zod'
import { emailSchema, passwordSchema } from '@shared/model/validations'

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginCredentials = z.infer<typeof loginSchema>
