import { createSlice, createAsyncTrunk } from "@reduxjs/toolkit"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

const stored = localStorage.getItem("user") // user info like id username and role, non sensitive data 

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { dispatch }) => {
  await fetch(`${BASE_URL}/api/auth/logout`, {
    method:      "POST",
    credentials: "include",
  })
  dispatch(clearAuth())
})


// slice for handling auth and storage
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:            stored ? JSON.parse(stored) : null,
    isAuthenticated: !!stored,
  },
  reducers: {
    loginSuccess(state, action) {
      state.user            = action.payload.user
      state.isAuthenticated = true
      localStorage.setItem("user", JSON.stringify(action.payload.user))
    },
    clearAuth(state) {
      state.user            = null
      state.isAuthenticated = false
      localStorage.removeItem("user")
    }
  }
})

export const { loginSuccess, clearAuth } = authSlice.actions
export default authSlice.reducer