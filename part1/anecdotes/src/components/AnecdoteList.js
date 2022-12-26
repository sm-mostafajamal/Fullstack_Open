import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)


  const dispatch = useDispatch()
  
  const vote = (id) => {
    dispatch(updateVote(id))
  }
  
  // const anecdoteCopy = anecdotes.slice()
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes-a.votes)


  return (
    <div>
      {
        sortedAnecdotes.map(anecdote => 
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
    </div>
  )
}

export default AnecdoteList;