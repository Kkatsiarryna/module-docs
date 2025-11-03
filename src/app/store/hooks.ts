import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@app/store/store.ts'

// Используем типизированные хуки для Redux
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector<RootState, T>(selector)
