const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require("./utils/config")
const blogsRouter=require("./controllers/blogs")
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const getToken = require('./utils/tokenExtractor')
const userExtractor = require('./utils/userExtractor')

mongoose.set('strictQuery', false)
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(getToken)
app.use(userExtractor)
app.use("/api/users", userRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/login", loginRouter)

module.exports=app