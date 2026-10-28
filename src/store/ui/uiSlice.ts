import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type UiState = {
  selectedShipmentId: string | null
}

const initialState: UiState = {
  selectedShipmentId: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedShipmentId: (state, action: PayloadAction<string>) => {
      state.selectedShipmentId = action.payload
    },
  },
})

export const { setSelectedShipmentId } = uiSlice.actions

export default uiSlice.reducer
