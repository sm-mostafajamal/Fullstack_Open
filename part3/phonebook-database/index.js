require('dotenv').config()
const express = require('express');
const app = express();
// const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const PORT = process.env.PORT 

// Middlewares
app.use(express.json())
// using morgan custom token
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// morgan.token('body', req => {
//   return JSON.stringify(req.body)
// })
app.use(cors())
app.use(express.static('build'))

// Error handling
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError' || error.name === 'ReferenceError') {    
    return res.status(400).json({ error: error.message }).end()
  }else if(error.name === 'BSONTypeError' || error.name === 'CastError'){
    return res.status(404).json({
      error: 'contact not found'
    }).end()
  }else if(error.name === 'MongoServerError'){
    return res.status(409).json({
      error: 'Conflict: contact already exists'
    })
  }
  next(error)
}




app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})

// app.get('/info', (req, res) => {
//     res.send(`<p>Phonebook has info for ${persons.length} people<p> ${new Date()}`)
// })

app.get('/api/persons/:id', (req, res, next) => {

  Person.findById(req.params.id).then(contact => {
    res.json(contact)
  }).catch(error => {
      next(error)

  })

})
  
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
  }).catch(error => {
    next(error)
  })

  })

  
app.put('/api/persons/:id', (req, res) => {
  const {name, number} = req.body
  Person.findByIdAndUpdate(req.params.id, {name, number}, {
    new: true, 
    runValidators: true, 
  }).then(updateContact => {
          res.json(updateContact)
        }).catch(error => {
          next(error)
        })
  
})



app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id).then(person => {
      res.status(204).end()
    })
    
})



app.use(errorHandler)


app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})


