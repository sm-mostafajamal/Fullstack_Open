import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAll, update } from '../Server/services'
// import { useContext } from 'react'
import AnecdoteContext, { useDispatch } from '../AnecdoteContext'


const DisplayAnecdotes = () => {
    // const [state, dispatch] = useContext(AnecdoteContext)
    const dispatch = useDispatch()
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
        dispatch({ type: 'voted', data})
        const anecdotes = queryClient.getQueryData('anecdotes')
        const anecs = anecdotes.map(a => a.id !== data.id? a : data)
        return queryClient.setQueryData('anecdotes', anecs)
      }
    })
  }

  return (
    <div>
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

export default DisplayAnecdotes