import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { notiVote } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  
  const anecdotes = useSelector(state => {
    if(state.filter === 'All') {
      return state.anecdotes
    }

    return [...state.anecdotes].filter(a => { 
      const anecs = a.content.toLowerCase()
      return anecs.indexOf(state.filter) > -1
    })
    
  })
  
  const vote = (id) => {
    dispatch(updateVote(id))
    dispatch(notiVote(id))
  }



  return (
    <div>
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
    </div>
  )
}

export default AnecdoteList;