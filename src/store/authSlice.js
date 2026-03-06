import { createSlice } from "@reduxjs/toolkit"

const stored = localStorage.getItem("user") // in production, go to https, handled by production host

// slice for handling auth and storage
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token:           localStorage.getItem("token") || null,
    user:            stored ? JSON.parse(stored) : null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    loginSuccess(state, action) {
      state.token           = action.payload.token
      state.user            = action.payload.user
      state.isAuthenticated = true
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("user",  JSON.stringify(action.payload.user))
    },
    logout(state) {
      state.token           = null
      state.user            = null
      state.isAuthenticated = false
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer