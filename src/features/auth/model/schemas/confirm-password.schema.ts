import { z } from 'zod'
import { passwordSchema } from '@shared/validations'

export const confirmPasswordSchema = z.object({
  password: passwordSchema,
})
