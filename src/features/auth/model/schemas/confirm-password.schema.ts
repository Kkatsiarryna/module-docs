import { z } from 'zod'
import { PASSWORD_SCHEMA } from '@shared/model/validation'

export const CONFIRM_PASSWORD_SCHEMA = z.object({
  password: PASSWORD_SCHEMA,
})
