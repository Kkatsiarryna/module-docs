import { createSlice } from '@reduxjs/toolkit'

import type { User } from '@features/auth/model/types/types.ts'
import { authApi } from '@features/auth/api'

type AuthState = {
  user: User | null
  isLoggedIn: boolean
}

const adminUser: User = {
  id: '545545455',
  email: 'email@mail.ru',
  firstname: 'John',
  lastname: 'Smith',
  role: 'admin',
}

const initialState: AuthState = {
  // user: null,
  user: adminUser,
  isLoggedIn: false, //поменять на false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectUser: state => state.user,
  },
  reducers: create => ({
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setUserAC: create.reducer<User | null>((state, action) => {
      state.user = action.payload
    }),
  }),
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

export const { selectIsLoggedIn, selectUser } = authSlice.selectors
export const { setIsLoggedInAC, setUserAC } = authSlice.actions
export const authReducer = authSlice.reducer
