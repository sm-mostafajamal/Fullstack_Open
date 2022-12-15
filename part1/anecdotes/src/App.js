import { useSelector, useDispatch } from 'react-redux'
import { anecdote, newAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm' 


const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
  const vote = (id) => {
    dispatch(anecdote(id))
  }

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(newAnecdote(content))
  }

  anecdotes.sort((a, b) => b.votes-a.votes)

  
  return (
      <div>
        <h2>Anecdotes</h2>
        {
          anecdotes.map(anecdote => 
          
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <AnecdoteForm onSubmit={addAnecdote} />
      </div>
    )
}

export default App