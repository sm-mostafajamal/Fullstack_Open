import './index.css'

import { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';
import contactServices from './services/persons';
import Notification  from './Components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [addedMsg, setAddedMsg] = useState(null)

  useEffect(()=> {
    contactServices
    .getAll()
    .then(initialNotes => setPersons(initialNotes))
  },[])
  
  const addContact =(e)=> {
    e.preventDefault()
    const searchedContact = persons.find(person => person.name === newName.trim())
    if(searchedContact){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one`)){
        const updateContact = {...searchedContact, number: number}

        contactServices
        .update(searchedContact.id, updateContact)
        .then(updateContact => {
          setPersons(persons.map(p => p.id !== searchedContact.id ? p : updateContact))
          setAddedMsg(()=> `Updated ${searchedContact.name}`)
          setTimeout(()=>setAddedMsg(null), 5000)
          setNewName('')
          setNumber('')
        })
        
      }
    }else {

      const newContact = {
        name: newName, 
        number: number, 
      }
      contactServices
      .create(newContact)
      .then(contactData => {
          setPersons(persons.concat(contactData))
          setAddedMsg(()=> `Added ${newContact.name}`)
          setTimeout(()=>setAddedMsg(null), 5000)
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

      <Notification message={addedMsg} />
      <Filter showAll={showAll} setShowAll = {setShowAll} />

      <h3>add a new</h3>

      <PersonForm newName={newName} number={number} addContact={addContact} setNewName={setNewName} setNumber={setNumber} />

      
      <h3>Numbers</h3>

      <Persons contactToShow={contactToShow} setPersons={setPersons} />
    </div>
  )
}

export default App