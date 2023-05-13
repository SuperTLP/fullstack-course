const mongoose = require("mongoose")
require("dotenv").config()

const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

console.log(process.argv.length)

const userSchema = new mongoose.Schema(
    {
    name:{
        type: String,
        minlength: 3,
        required: true
        },
    number: {
        type: String
        }
    }
)   

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const User = mongoose.model("User", userSchema)

if (process.argv.length==3) {
    User.find({}).then(res => {
        res.forEach(user => {
            console.log(user.name, user.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length==5) {
    let user = new User({name: process.argv[3], number: process.argv[4]})
    user.save().then(res => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}

module.exports=User