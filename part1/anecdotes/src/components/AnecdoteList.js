import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { notiVote } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ anecdotes, notification, filter }) => {
    if(filter === 'All') {
      return anecdotes
    }

    return [...anecdotes].filter(a => {
      const anecs = a.content.toLowerCase()
      return anecs.indexOf(filter) > -1
    })
    
  })
  
  const vote = (id, content) => {
    dispatch(updateVote(id))
    dispatch(notiVote(content))
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;