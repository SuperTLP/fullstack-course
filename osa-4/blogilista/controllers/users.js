const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")
const errorHandler = require("../utils/errorHandler")

userRouter.post("/", async (request, response, next) => {
    const {username, name, password}=request.body
    if (request.body["username"]===undefined || request.body["password"]===undefined) {
        return response.status(400).json({"error": "you must enter a username and a password."})
    }
    if (username.length<3 || password.length<3) {
        return response.status(400).json({"error": "username and password must be at least 3 symbols long."})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    try {
        const user = new User({username, name, passwordHash})
        user.blogs=[]
        const savedUser= await user.save()
        return response.status(201).json(savedUser)
    }
    catch(error) {
        next(error)
    }

}, errorHandler)

userRouter.get("/", async (request, response) => {
    let users = await User.find({}).populate("blogs")
    response.json(users)
})
module.exports=userRouter