import { configureStore } from "@reduxjs/toolkit"
import authReducer     from "./authSlice"
import productsReducer from "./productsSlice"
import filtersReducer  from "./filtersSlice"

export const store = configureStore({
  reducer: {
    auth:     authReducer,
    products: productsReducer,
    filters:  filtersReducer,
  }
})