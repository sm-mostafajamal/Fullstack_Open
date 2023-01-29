import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anecdotes'


// const anecdotesInitialState = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const generateId = () => (100000 * Math.random()).toFixed(0)


// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: generateId(),
//     votes: 0
//   }
// }
// export const initialState = anecdotesInitialState.map(asObject)



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdotes (state, action){
      const updatedContend = action.payload
      return state.map(a => a.id !== updatedContend.id? a : updatedContend)
    },
    appendAnecdote (state, action) {
      state.concat(action.payload)
    },
    setAnecdote (state, action) {
      return action.payload
    }
  }
})


export const { updateAnecdotes, appendAnecdote, setAnecdote} =anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    anecService.getAll().then(anecdotes => {
      dispatch(setAnecdote(anecdotes))
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = (content) => {
  return async dispatch => {
    const changedAnecdote = {
      ...content,
      votes: content.votes + 1
    }
    const updatedAnec = await anecService.update(changedAnecdote.id, changedAnecdote)
    dispatch(updateAnecdotes(updatedAnec))
  }
}

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