import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@app/store/store'
import type { User } from '@features/auth/model/types/types.ts'
import { authApi } from '@features/auth/api'

type AuthState = {
  user: User | null
  isLoggedIn: boolean
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: true, //поменять на false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC: (state, action: { payload: { isLoggedIn: boolean } }) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setUserAC: (state, action: { payload: User }) => {
      state.user = action.payload
    },
  },
  extraReducers: build => {
    build.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload
    })
    build.addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
      state.isLoggedIn = false
      state.user = null
    })
  },
})

// Создаем селекторы вручную
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectUser = (state: RootState) => state.auth.user

export const { setIsLoggedInAC, setUserAC } = authSlice.actions
export const authReducer = authSlice.reducer
