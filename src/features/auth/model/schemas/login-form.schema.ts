import { z } from 'zod'
import { EMAIL_SCHEMA, PASSWORD_SCHEMA } from '@shared/model/validation'

export const LOGIN_SCHEMA = z.object({
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
})

export type LoginCredentials = z.infer<typeof LOGIN_SCHEMA>
