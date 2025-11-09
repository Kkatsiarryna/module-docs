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

// @ts-ignore
window.store = store
