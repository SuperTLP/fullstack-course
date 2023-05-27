require("dotenv").config()

let PORT = process.env.PORT
let SECRET=process.env.SECRET
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports={PORT, MONGODB_URI, SECRET}
