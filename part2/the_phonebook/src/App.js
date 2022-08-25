import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';
import contactServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [showAll, setShowAll] = useState('')

  useEffect(()=> {
    
    contactServices
    .getAll()
    .then(initialNotes => setPersons(initialNotes))

  },[])
  
  const addContact =(e)=> {
    e.preventDefault()
    if(persons.find(person => person.name === newName.trim())){
      alert(`${newName} is already added to phonebook`)
    }else {

      const newContact = {
        name: newName, 
        number: number, 
      }
      contactServices
      .create(newContact)
      .then(contactData => {
          setPersons(persons.concat(contactData))
          setNewName('')
          setNumber('')
        })

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

      <Persons contactToShow={contactToShow} setPersons={setPersons} />
    </div>
  )
}

export default App