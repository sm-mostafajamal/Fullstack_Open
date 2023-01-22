import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notiNewAnec } from '../reducers/notificationReducer'
import anecServices from '../services/anecdotes'

const AnecdotesForm = () => {
  const dispatch = useDispatch()

   const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newNote = await anecServices.createNew(content)
    dispatch(newAnecdote(newNote))
    dispatch(notiNewAnec(newNote))
  }
  
  return <form onSubmit={addAnecdote}>
          <h2>create new</h2>
          <div>
            <input name='anecdote'/>
            <button type='submit'>create</button>
          </div>
        </form>
}


export default AnecdotesForm;