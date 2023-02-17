import { createContext, useReducer, useContext } from "react";

const anecdoteReducer = (state, action) => {

  switch(action.type) {
    case 'voted':
      return state = `anecdote '${action.data.content}' voted`
    case 'created':
      return state = `anecdote '${action.newAnec.content}' created`
    case 'clear':
      return state = null
    default: 
      return state
  }
}


const AnecdoteContext = createContext()

export const useState = () => {
  const stateAndDispatch = useContext(AnecdoteContext)
  return stateAndDispatch[0]
}

export const useDispatch = () => {
  const stateAndDispatch = useContext(AnecdoteContext)
  return stateAndDispatch[1]
}

export const AnecdoteContextProvider = (props) => {
  const [state, dispatch]= useReducer(anecdoteReducer, null)

  return (
    <AnecdoteContext.Provider value={[state, dispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
    
    ) 
}

export default AnecdoteContext