import { useMutation, useQueryClient } from "react-query"
import { create } from "../Server/services"

const AnecdoteForm = () => {
  const newAnceMutation = useMutation(create)
  const queryClient = useQueryClient()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnceMutation.mutate({content, votes: 0},{
    // onSuccess: () => {
    //   queryClient.invalidateQueries('anecdotes')
    // }
        onSuccess : (newAnec) => {
        const anecdotes =queryClient.getQueryData('anecdotes')
        return queryClient.setQueryData('anecdotes', anecdotes.concat(newAnec))
      }
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
