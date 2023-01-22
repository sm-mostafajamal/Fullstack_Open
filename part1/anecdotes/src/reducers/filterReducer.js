import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState : 'All',
  reducers: {
    searcheValue(state, action) {
      return action.payload.toLowerCase()
    }
  }
})

export const { searcheValue } = filterSlice.actions
export default filterSlice.reducer