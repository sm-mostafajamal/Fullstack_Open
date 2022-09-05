require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const PORT = process.env.PORT 

// Middlewares
app.use(express.json())
// using morgan custom token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    console.log(person)
    res.json(person)
  })
})

// app.get('/info', (req, res) => {
//     res.send(`<p>Phonebook has info for ${persons.length} people<p> ${new Date()}`)
// })

// app.get('/api/persons/:id', (req, res) => {
//   const id = Number(req.params.id)
//   const person = persons.find(p => p.id === id)
//   if(person){
//     res.json(person)
//     }else{
//       res.status(404).end()
//     }
//   })
  
app.post('/api/persons', (req, res) => {
  const contactInfo = req.body  
  if(!contactInfo.name || !contactInfo.number){
    return res.status(400).json({
      error: 'contact info missing'
    })
  }
  // else if(persons.find(p=> (p.name).toLowerCase() === (newContact.name).toLowerCase())){
    //   return res.status(409).json({
      //     error: 'name must be unique' 
      //   })
      // }
 
      const contact = new Person({
        name: contactInfo.name.trim(),
        number: contactInfo.number,
        date: new Date()
      })
      contact.save().then(savedContact => {
        Person.find({}).then(person => {
          res.json(person) 
          
        })
        // console.log(savedContact)
      }) 

    })
    


app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.find(id)
    // persons = persons.filter(p => p.id !== id)
    res.status(204).end()
    
})

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})

