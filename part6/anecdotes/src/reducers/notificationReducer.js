import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    notification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { notification, clearNotification } = notificationSlice.actions

export const setNotification = (content, timer) => {
  return async dispatch => {
    dispatch(notification(content))
    setTimeout(() => dispatch(clearNotification()), timer)
  } 
} 
export default notificationSlice.reducer