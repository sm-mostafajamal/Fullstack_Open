import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')

  const addContact =(e)=> {
    e.preventDefault()
    if(persons.find(person => person.name === newName.trim())){
      alert(`${newName} is already added to phonebook`)
    }else {
      setPersons(persons.concat({name: newName, number: number}))
      setNewName('')
      setNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={(e)=> setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={number} onChange={(e)=> setNumber(e.target.value) } />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}> {person.name} {person.number}</div>)}
      </div>
    </div>
  )
}

export default App