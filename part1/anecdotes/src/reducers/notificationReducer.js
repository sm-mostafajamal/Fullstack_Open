import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    notiVote(state, action) {
      return `you voted '${action.payload}'`
    },
    notiNewAnec(state, action) {
      return `you added '${action.payload}'`
    },
    hide(state, action) {
      return null
    }
  }
})

export const { notiVote, hide, notiNewAnec } = notificationSlice.actions
export default notificationSlice.reducer