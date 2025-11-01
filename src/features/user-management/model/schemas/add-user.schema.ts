import { z } from 'zod'
import {
  EMAIL_SCHEMA,
  FIRSTNAME_SCHEMA,
  LASTNAME_SCHEMA,
  ROLE_SCHEMA,
} from '@shared/model/validation'

export const ADD_USER_SCHEMA = z.object({
  firstname: FIRSTNAME_SCHEMA,
  lastname: LASTNAME_SCHEMA,
  role: ROLE_SCHEMA,
  email: EMAIL_SCHEMA,
})

export type AddUserFormData = z.infer<typeof ADD_USER_SCHEMA>
