import type { ReactNode } from 'react'
import { store } from '@app/store'
import { Provider } from 'react-redux'

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>
}
