import { useState, useCallback } from 'react'
import { z } from 'zod'

export const useFileValidation = () => {
  const [error, setError] = useState<Record<string, string | undefined>>({})

  const validateFile = useCallback(
    (file: File, schema: z.ZodSchema<File>, field?: string): boolean => {
      const result = schema.safeParse(file)

      if (!result.success) {
        const message = result.error.issues[0]?.message ?? 'Некорректный файл'
        setError(prev => ({
          ...prev,
          [field ?? 'file']: message,
        }))
        return false
      }

      setError(prev => ({
        ...prev,
        [field ?? 'file']: undefined,
      }))
      return true
    },
    []
  )

  return { error, validateFile, setError }
}
