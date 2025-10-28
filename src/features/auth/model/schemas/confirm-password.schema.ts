import { z } from 'zod'
import { passwordSchema } from '@shared/model/validation'

export const confirmPasswordSchema = z.object({
  password: passwordSchema,
})
