import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdotesForm = () => {
  const dispatch = useDispatch()

   const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you added '${content}'`, 3000))
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