import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'


const AnecdotesForm = () => {
  const dispatch = useDispatch()

   const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(newAnecdote(content))
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