import AnecdoteForm from './components/AnecdoteForm' 
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdote } from './reducers/anecdoteReducer'
import anecService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() =>{
    anecService.getAll().then(anecdotes => {
      dispatch(setAnecdote(anecdotes))
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 
  return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        <Notification />        
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
}

export default App