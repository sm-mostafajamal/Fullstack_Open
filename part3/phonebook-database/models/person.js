const mongoose = require('mongoose')


console.log('connecting to ', process.env.MONGODB_URI)

mongoose
.connect(process.env.MONGODB_URI)
.then(res => {
    console.log('connected to Database')
}).catch(err => {
    console.log(err)
})

const personSchema = mongoose.Schema({
    name: String,
    number: String
})
personSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id =  returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v 
    }
})



module.exports = mongoose.model('Person', personSchema)