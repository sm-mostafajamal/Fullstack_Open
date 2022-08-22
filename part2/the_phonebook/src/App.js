import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [showAll, setShowAll] = useState('')

  useEffect(()=> {
    console.log('effect')
    axios
    .get("http://localhost:3001/persons")
    .then(res => setPersons(res.data))

  },[])
  
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