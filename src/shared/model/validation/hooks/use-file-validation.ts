import { useState, useCallback } from 'react'
import { z } from 'zod'

export const useFileValidation = () => {
  const [error, setError] = useState<string | undefined>(undefined)

  const validateFile = useCallback(
    async (file: File, schema: z.ZodSchema<File>): Promise<boolean> => {
      setError(undefined)

      try {
        await schema.parseAsync(file)
        return true
      } catch (err: unknown) {
        const error = err as { errors?: { message?: string }[] }
        const message = error.errors?.[0]?.message ?? 'Некорректный файл'
        setError(message)
        return false
      }
      // const result = schema.safeParse(file)
      //
      // if (!result.success) {
      //   const message = result.error.issues[0]?.message ?? 'Некорректный файл'
      //   setError(message)
      //   return false
      // }
      //
      // setError(undefined)
      // return true
    },
    []
  )

  const clearError = useCallback(() => {
    setError(undefined)
  }, [])

  return { error, validateFile, clearError }
}
