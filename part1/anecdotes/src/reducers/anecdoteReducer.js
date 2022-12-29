import { createSlice } from '@reduxjs/toolkit'



const anecdotesInitialState = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const generateId = () => (100000 * Math.random()).toFixed(0)


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0
  }
}
export const initialState = anecdotesInitialState.map(asObject)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    newAnecdote (state, action) {
      const content = action.payload
      return state.concat({
        content,
        id: generateId(),
        votes: 0
      })
    },
    updateVote (state, action) {
      const anecdotesToChange = state.find(a => a.id === action.payload)
      const changedAnecdote = {
        ...anecdotesToChange,
        votes: anecdotesToChange.votes + 1
      }
      const anecdotes = state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
      return [...anecdotes].sort((a, b) => b.votes-a.votes)
    }
  }
})



export const { newAnecdote, updateVote} =anecdoteSlice.actions
export default anecdoteSlice.reducer



// // Before
// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// export const anecdote = (id) => {
//   return {
//     type: 'UPDATE_VOTE',
//     data: { id }
//   }
// }

// export const newAnecdote = (content) => {
//   return {
//     type: 'New_Anecdote',
//     data: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   if(action.type === 'UPDATE_VOTE') {
//   const anecdotesToChange = state.find(a => a.id === action.data.id)
//   const changedAnecdote = {
//     ...anecdotesToChange,
//     votes: anecdotesToChange.votes + 1
//   }
//   return state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
//   }else if(action.type === 'New_Anecdote'){
//     return state.concat(action.data)
//   }

//   return state
// }

// export default reducer