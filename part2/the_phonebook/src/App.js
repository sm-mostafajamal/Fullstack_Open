import { useState } from 'react';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';


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
  const personName  = persons.filter(person => ((person.name.toLowerCase()).includes(showAll.toLowerCase())) && person)

  const contactToShow = showAll === '' ? persons : personName


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter showAll={showAll} setShowAll = {setShowAll} />

      <h3>add a new</h3>

      <PersonForm newName={newName} number={number} addContact={addContact} setNewName={setNewName} setNumber={setNumber} />

      <h3>Numbers</h3>

      <Persons contactToShow={contactToShow} />
    </div>
  )
}

export default App