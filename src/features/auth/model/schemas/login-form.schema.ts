import { z } from 'zod'
import { emailSchema, passwordSchema } from '@shared/model/validation'

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginCredentials = z.infer<typeof loginSchema>
