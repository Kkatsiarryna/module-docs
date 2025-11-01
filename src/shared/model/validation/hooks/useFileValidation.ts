import { useState, useCallback } from 'react'
import { z } from 'zod'

export const useFileValidation = () => {
  const [error, setError] = useState<string | undefined>(undefined)

  const validateFile = useCallback((file: File, schema: z.ZodSchema<File>): boolean => {
    const result = schema.safeParse(file)

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Некорректный файл'
      setError(message)
      return false
    }

    setError(undefined)
    return true
  }, [])

  const clearError = useCallback(() => {
    setError(undefined)
  }, [])

  return { error, validateFile, clearError }
}
