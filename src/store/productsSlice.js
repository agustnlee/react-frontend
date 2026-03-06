import { createSlice } from "@reduxjs/toolkit"

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items:       [],
    totalPages:  0,
    currentPage: 0,
    loading:     false,
    error:       null,
  },
  reducers: {}
})

export default productsSlice.reducer