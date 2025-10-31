import { z } from 'zod'
import { IMAGE_SCHEMA } from '@shared/ui/photo-uploader/image.schema.ts'

const nameRegex = /^(?!.*--)(?!.*\s\s)[A-Za-zА-Яа-яЁё]+([-\s][A-Za-zА-Яа-яЁё]+)*$/

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: 'Поле "Имя" не должно быть пустым' })
    .max(255, { message: 'Имя не должно превышать 255 символов' })
    .regex(nameRegex, { message: 'Недопустимые символы' }),

  lastname: z
    .string()
    .min(1, { message: 'Поле "Фамилия" не должно быть пустым' })
    .max(255, { message: 'Фамилия не должна превышать 255 символов' })
    .regex(nameRegex, { message: 'Недопустимые символы' }),

  avatar: IMAGE_SCHEMA,
})

export type ProfileFormData = z.infer<typeof profileSchema>
