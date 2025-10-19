import { ThemeProvider } from './theme'
import type { ReactNode } from 'react'
import { StoreProvider } from '@app/providers/store'
import { RouterProvider } from '@app/providers/router'

interface WithProvidersProps {
  children: ReactNode
}

export const WithProviders = ({ children }: WithProvidersProps) => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <RouterProvider>{children}</RouterProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}
