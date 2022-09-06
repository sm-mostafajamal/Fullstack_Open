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


// Error handling
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if(error.name  === 'AxiosError'){
    return res.status(400).json({
      error: 'contact info missing'
    })
  }
  next(error)
}

app.use(errorHandler)



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
  
app.post('/api/persons', (req, res, next) => {
  const contactInfo = req.body  
  if(!contactInfo.name || !contactInfo.number){
    return next(error)
  }
 
  const contact = new Person({
    name: contactInfo.name.trim(),
    number: contactInfo.number,
    date: new Date()
  })
  contact.save().then(savedContact => {
    Person.find({}).then(person => {
      res.json(person) 
    })
  })

  })

  
app.put('/api/persons/:id', (req, res) => {
  const {name, number} = req.body
  Person.findByIdAndUpdate(req.params.id, {name, number}, {new: true})
        .then(updateContact => {
          res.json(updateContact)
        })
  
})



app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id).then(person => {
      res.status(204).end()
    })
    
})

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})

