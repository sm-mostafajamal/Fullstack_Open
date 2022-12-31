import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState : 'All',
  reducers: {
    searcheValue(state, action) {
      const value = action.payload
      return value.toLowerCase()
    }
  }
})

export const { searcheValue } = filterSlice.actions
export default filterSlice.reducer