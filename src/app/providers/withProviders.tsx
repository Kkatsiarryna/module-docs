import { ThemeProvider } from './theme'
import type { ReactNode } from 'react'

interface WithProvidersProps {
  children: ReactNode
}

export const WithProviders = ({ children }: WithProvidersProps) => {
  return (
    <ThemeProvider>
      {/* В будущем можно добавить другие провайдеры */}
      {/* <StoreProvider> */}
      {/* <RouterProvider> */}
      {children}
      {/* </RouterProvider> */}
      {/* </StoreProvider> */}
    </ThemeProvider>
  )
}
