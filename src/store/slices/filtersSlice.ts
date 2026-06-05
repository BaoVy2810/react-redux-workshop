import { createSlice } from '@reduxjs/toolkit'

export interface FiltersState {
  category: string | null
}

const initialState: FiltersState = {
  category: null,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action: { payload: string }) {
      state.category = action.payload
    },
    clearFilters(state) {
      state.category = null
    },
  },
})

export const { setFilter, clearFilters } = filtersSlice.actions
export default filtersSlice.reducer
