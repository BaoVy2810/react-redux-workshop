import { createSlice } from '@reduxjs/toolkit'

export interface UiState {
  loading: boolean
  modalOpen: boolean
}

const initialState: UiState = {
  loading: false,
  modalOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: { payload: boolean }) {
      state.loading = action.payload
    },
    setModalOpen(state, action: { payload: boolean }) {
      state.modalOpen = action.payload
    },
  },
})

export const { setLoading, setModalOpen } = uiSlice.actions
export default uiSlice.reducer
