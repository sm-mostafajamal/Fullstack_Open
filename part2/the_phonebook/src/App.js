import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [showAll, setShowAll] = useState('')


  const addContact =(e)=> {
    e.preventDefault()
    if(persons.find(person => person.name === newName.trim())){
      alert(`${newName} is already added to phonebook`)
    }else {
      setPersons(persons.concat({name: newName, number: number, id: persons.length+1}))
      setNewName('')
      setNumber('')
    }
  }
  const personName  = persons.filter(person => { 
    if((person.name.toLowerCase()).includes(showAll)) return person
  })

  const contactToShow = showAll === '' ? persons : personName


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input  value={showAll} onChange={(e)=> setShowAll(e.target.value)} />
      </div>
      <h2>add a new</h2>
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
        {contactToShow.map(contact => <div key={contact.id}> {contact.name} {contact.number}</div>)}

      </div>
    </div>
  )
}

export default App