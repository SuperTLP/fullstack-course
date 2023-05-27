const config = require("../utils/config")
const jwt = require("jsonwebtoken")
const userExtractor = (request, response, next)=>{
    let token = request.token
    try {
      console.log("täs")
      let user = jwt.verify(token, config.SECRET)
      request.user=user
      next()
    }
    catch (err) {
      request.user=null
      next()
    }
}

module.exports=userExtractor