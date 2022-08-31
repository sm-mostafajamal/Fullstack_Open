const mongoose = require('mongoose');

if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}


const password = process.argv[2]

const url = `mongodb+srv://practice:${password}@practicecluster.uazbw.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

mongoose
    .connect(url)
    .then(result => {
        console.log('connected')
        if(process.argv.length  > 3){
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            })
            console.log(`added ${person.name} number ${person.number} to phonebook`) 
            person.save()
                    .then(()=> {
                console.log("contact saved")
                mongoose.connection.close()
            })
        }else {
            Person.find({}).then(persons => {
                persons.forEach(person => {
                    console.log(person.name, person.number)
                })
            })
            mongoose.connection.close()
        }
    })