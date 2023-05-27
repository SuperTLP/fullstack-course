const loginRouter=require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")

loginRouter.post("/", async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({username})
    console.log("täs2")
    if (user===null || password==null || !(await bcrypt.compare(password, user.passwordHash))) {
        return response.status(401).json({"error": "Invalid username or password"})
    }
    console.log("täs3")
    const userToken = jwt.sign({"username": username, "id": user._id}, config.SECRET)
    console.log("täs4")
    return response.status(200).json({"token": userToken})
})

module.exports=loginRouter