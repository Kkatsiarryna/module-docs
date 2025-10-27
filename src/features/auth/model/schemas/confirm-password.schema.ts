import { z } from 'zod'
import { passwordSchema } from '@shared/model/validations'

export const confirmPasswordSchema = z.object({
  password: passwordSchema,
})
