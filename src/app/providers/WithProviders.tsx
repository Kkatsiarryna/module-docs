import { ThemeProvider } from './theme'
import type { ReactNode } from 'react'
import { StoreProvider } from '@app/providers/store'
import { RouterProvider } from '@app/providers/router'
import { ToastProvider } from '@app/providers/toast'
import { AppInitProvider } from '@app/providers/app-init'

interface WithProvidersProps {
  children: ReactNode
}

export const WithProviders = ({ children }: WithProvidersProps) => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <ToastProvider>
          <RouterProvider>
            <AppInitProvider>{children}</AppInitProvider>
          </RouterProvider>
        </ToastProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}
