import { useToast } from '@app/providers/toast'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const useApiError = () => {
  const { showToast } = useToast()

  const handleApiError = (error: unknown) => {
    const err = error as FetchBaseQueryError

    if (err.status === 409) {
      showToast('Данный email уже зарегистрирован в системе', 'error')
      return
    }

    // if (typeof err.status === 'number') {
    //   showToast(`Ошибка ${err.status}. Попробуйте позже.`, 'error')
    //   return
    // }

    showToast('Неизвестная ошибка', 'error')
  }

  return { handleApiError }
}
