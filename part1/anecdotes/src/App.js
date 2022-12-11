import { useSelector, useDispatch } from 'react-redux'
import { anecdote } from './reducers/anecdoteReducer'

const App = () => {
  
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(anecdote(id))
  }
  
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
        <form>
          <div>
            <input />
            <button>create</button>
          </div>
        </form>
      </div>
    )
}

export default App