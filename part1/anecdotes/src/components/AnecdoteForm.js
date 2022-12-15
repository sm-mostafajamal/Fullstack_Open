const AnecdotesForm = ({ onSubmit }) => {
  return <form onSubmit={onSubmit}>
          <div>
            <input name='anecdote'/>
            <button type='submit'>create</button>
          </div>
        </form>
}


export default AnecdotesForm;