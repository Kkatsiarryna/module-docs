import { Toast, type ToastVariant } from '@shared/ui'
import { type ReactNode, useCallback, useState } from 'react'
import { ToastContext } from './useToast'

type ToastState = {
  message: string
  variant: ToastVariant
} | null

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState>(null)

  const showToast = useCallback((message: string, variant: ToastVariant = 'success') => {
    setToast({ message, variant })
  }, [])

  const handleClose = useCallback(() => {
    setToast(null)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          key={toast.message}
          message={toast.message}
          variant={toast.variant}
          open
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  )
}
