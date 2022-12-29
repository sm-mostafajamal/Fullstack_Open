import { createSlice } from "@reduxjs/toolkit";
import { initialState as anecdotes } from "./anecdoteReducer";



const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    notiVote(state, action) {
      const anecdote = anecdotes.find(a => a.id === action.payload)

      return `you voted '${anecdote.content}'`
    },
    notiNewAnec(state, action) {
      return `you added '${action.payload}'`
    },
    hide(state, action) {
      return ''
    }
  }
})

export const { notiVote, hide, notiNewAnec } = notificationSlice.actions
export default notificationSlice.reducer