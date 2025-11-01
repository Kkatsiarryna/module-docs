import { z } from 'zod'
import { FIRSTNAME_SCHEMA, LASTNAME_SCHEMA, IMAGE_SCHEMA } from '@shared/model/validation'

export const PROFILE_SCHEMA = z.object({
  firstname: FIRSTNAME_SCHEMA,
  lastname: LASTNAME_SCHEMA,
  avatar: IMAGE_SCHEMA,
})

export type ProfileFormData = z.infer<typeof PROFILE_SCHEMA>
