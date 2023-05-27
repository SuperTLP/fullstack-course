const getToken=(request, response, next)=>{
    let token = request.get("authorization")
    console.log(token)
    if (token!=null && token.includes("Bearer ")) {
        console.log("vaihettu")
      token=token.replace("Bearer ", "")
    }
    request.token=token
    next()
  }

module.exports=getToken
