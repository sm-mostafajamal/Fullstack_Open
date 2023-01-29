import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { notiVote } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ anecdotes, notification, filter }) => {
    if(filter === 'All') {
      return [...anecdotes].sort((a, b) => b.votes-a.votes)
      
    }

    return [...anecdotes].filter(a => {
      const anecs = a.content.toLowerCase()
      return anecs.indexOf(filter) > -1 //this filter value is from useSelector parameter
    })
    
  })
  const vote = (content) => {
    
    dispatch(updateVote(content))
    dispatch(notiVote(content.content))
 
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;