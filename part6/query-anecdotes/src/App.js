import AnecdoteForm from './components/AnecdoteForm'
import DisplayAnecdotes from './components/DisplayAnecdotes'
import Notification from './components/Notification'


const App = () => {

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      <DisplayAnecdotes />
      
    </div>
  )
}

export default App
