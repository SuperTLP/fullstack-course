const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require("./utils/config")
const blogsRouter=require("./controllers/blogs")

mongoose.set('strictQuery', false)
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)


module.exports=app