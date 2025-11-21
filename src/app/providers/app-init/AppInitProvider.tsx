import { type ReactNode } from 'react'
// import { useMeQuery } from '@features/auth/api'
// import { useAppDispatch } from '@app/store'
// import { setIsLoggedInAC, setUserAC } from '@features/auth/model'
// import { LoadersMedium } from '@shared/ui'

interface AppInitProviderProps {
  children: ReactNode
}

export const AppInitProvider = ({ children }: AppInitProviderProps) => {
  // const { data, isLoading, error } = useMeQuery()
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   if (isLoading) return
  //
  //   if (data) {
  //     dispatch(setIsLoggedInAC({ isLoggedIn: true }))
  //     dispatch(setUserAC(data))
  //   } else {
  //     dispatch(setIsLoggedInAC({ isLoggedIn: false }))
  //     dispatch(setUserAC(null))
  //   }
  // }, [data, isLoading, error, dispatch])
  //
  // if (isLoading) {
  //   return <div>{LoadersMedium.primary}</div>
  // }

  return <>{children}</>
}
