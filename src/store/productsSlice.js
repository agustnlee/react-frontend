import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getProductsApi, getProductByIdApi, deleteProductApi } from "../api/products"

// fetch paginated list all
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ page = 0, size = 20, search, tag } = {}, { rejectWithValue }) => {
    try {
      return await getProductsApi({ page, size, search, tag })
    } catch (e) {
      return rejectWithValue({ code: e.code, message: e.message })
    }
  }
)

// fetch single product detail
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await getProductByIdApi(id)
    } catch (e) {
      return rejectWithValue({ code: e.code, message: e.message })
    }
  }
)

// delete product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductApi(id)
      return id   // return id so remove from state
    } catch (e) {
      return rejectWithValue({ code: e.code, message: e.message })
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items:         [],
    totalPages:    0,
    currentPage:   0,
    totalElements: 0,
    loading:       false,
    error:         null,
    selected:      null,   // to set the one for full data selected product
    selectedLoading: false,
  },
  reducers: {
    clearSelected(state) { state.selected = null },
    clearError(state)    { state.error    = null },
    setCurrentPage(state, action) { state.currentPage = action.payload },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error   = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading       = false
        state.items         = action.payload.content
        state.totalPages    = action.payload.totalPages
        state.currentPage   = action.payload.number
        state.totalElements = action.payload.totalElements
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error   = action.payload
      })

      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.selectedLoading = true
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedLoading = false
        state.selected        = action.payload
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.selectedLoading = false
      })

      // deleteProduct
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // remove deleted product from list immediately for responsiveness
        state.items = state.items.filter(p => p.id !== action.payload)
      })
  }
})

export const { clearSelected, clearError, setCurrentPage } = productsSlice.actions
export default productsSlice.reducer