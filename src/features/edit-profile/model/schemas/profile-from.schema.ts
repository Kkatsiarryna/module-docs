import { z } from 'zod'
import { FIRSTNAME_SCHEMA, LASTNAME_SCHEMA } from '@shared/model/validation'

export const PROFILE_SCHEMA = z.object({
  firstname: FIRSTNAME_SCHEMA,
  lastname: LASTNAME_SCHEMA,
  avatar: z
    .string()
    .refine(
      val => {
        try {
          new URL(val)
          return true
        } catch {
          return false
        }
      },
      { message: 'Введите корректный URL' }
    )
    .nullish(),
})

export type ProfileFormData = z.infer<typeof PROFILE_SCHEMA>
