const app = require("../app")
const mongoose = require("mongoose")
const supertest=require("supertest")
const User = require('../models/user')
const api = supertest(app)

const initialUsers=[
    {
        "username": "tauno",
        "name": "Tauno Testaaja",
        "password": "salainen sana"
    }
]

describe("user is not created and proper error message and status code is given on user creation when", ()=>{

    test("username has already been registered", async ()=>{
        let duplicateUser={...initialUsers[0]}
        let response = await api.post("/api/users").send(duplicateUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("User validation failed: username: Error, expected `username` to be unique. Value: `tauno`")
        response = await api.get("/api/users")
        expect(response.body).toHaveLength(1)
    })
    
    test("username is too short", async ()=>{
        let duplicateUser={...initialUsers[0]}
        duplicateUser.username="ab"
        let response = await api.post("/api/users").send(duplicateUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("username and password must be at least 3 symbols long.")
        response = await api.get("/api/users")
        expect(response.body).toHaveLength(1)
    })

    test("password is too short", async ()=>{
        let duplicateUser={...initialUsers[0]}
        duplicateUser.password="ab"
        let response = await api.post("/api/users").send(duplicateUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("username and password must be at least 3 symbols long.")
        response = await api.get("/api/users")
        expect(response.body).toHaveLength(1)
    })
})



beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
  
  })
  
  afterAll(async () => {
      await mongoose.connection.close()
  })