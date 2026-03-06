import { createSlice } from "@reduxjs/toolkit"


// slice for handling search input and tags
const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    search:      "",
    selectedTag: null,
  },
  reducers: {
    setSearch(state, action)      { state.search      = action.payload },
    setSelectedTag(state, action) { state.selectedTag = action.payload },
    clearFilters(state)           { state.search = ""; state.selectedTag = null },
  }
})

export const { setSearch, setSelectedTag, clearFilters } = filtersSlice.actions
export default filtersSlice.reducer