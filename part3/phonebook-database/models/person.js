const mongoose = require('mongoose')


console.log('connecting to ', process.env.MONGODB_URI)

mongoose
.connect(process.env.MONGODB_URI)
.then(res => {
    console.log('connected to Database')
}).catch(err => {
    console.log(err)
})

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    number: String,
    date: Date
 }, { versionKey: false }
)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v

      return returnedObject
    }
  })



module.exports = mongoose.model('Person', personSchema)