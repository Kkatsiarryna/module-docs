import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@shared/api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authReducer, authSlice } from '@features/auth/model'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.name]: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store

//middleware для использования дополнительных функций RTK Query: кэширование, инвалидация и pooling

//setupListeners для подключения слушателя событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect),
// чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения
