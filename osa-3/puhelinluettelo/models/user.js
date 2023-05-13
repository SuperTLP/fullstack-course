const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(res => console.log("connected to mongoDB"))
    .catch(err => console.log(`unable to connect to mongoDB: ${err.message}`))

const userSchema = new mongoose.Schema(
  {
  name:{
      type: String,
      minlength: 3,
      required: true
      },
  number: {
      type: String,
      validate: {
        validator: function(v) {
          return v.replace("-", "").length>=8 && v.includes("-") && /^\d+$/.test(v.replace("-", "")) && [2, 3].includes(v.split("-")[0].length)
        },
        message: res => `${res.value} is not a valid phone number!`
      },
      required: [true, 'User phone number required']
    }
    },
)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const User = mongoose.model("User", userSchema)


module.exports=User