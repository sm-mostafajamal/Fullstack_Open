import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAll, update } from './Server/services'


const App = () => {

  const updateAnecMutation = useMutation(update)
  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery(
    'anecdotes', 
    getAll, 
    {
      retry: false
    }
  )

  if(isLoading){ 
    return <span>Loading....</span>
  }
  if(isError){ 
    return <span>anecdote service not available due to problems in server</span>
  }
  

  const handleVote = (anecdote) => {
    const updatedAnec = {...anecdote, votes:anecdote.votes+1}
    updateAnecMutation.mutate(updatedAnec
      , {
      onSuccess: (data) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        const anecs = anecdotes.map(a => a.id !== data.id? a : data)
        return queryClient.setQueryData('anecdotes', anecs)
      }
    })
  }
  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      { 
        data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
