const app = require("../app")
const mongoose = require("mongoose")
const supertest=require("supertest")
const Blog = require('../models/blog')
const User = require("../models/user")
const api = supertest(app)

const initialBlogs = [
    {
        "author": "ekan testin kirjoittja",
        "title": "eka testi",
        "url": "https://www.youtube.com",

    },
    {
        "author": "toisen testin kirjoittaja",
        "title": "toka testi",
        "url": "https://test.com",
    }
]

const initialUsers=[
    {
        "username": "tauno",
        "name": "Tauno Testaaja",
        "password": "salainen sana",
    },
    {
        "username": "taunotoinen",
        "name": "toka testaaja",
        "password": "salasana",
    }
]

let newBlog = 
{
    "title": "uusi blogi",
    "author": "uuden blogin kirjoittaja",
    "url": "https://uusitesti.com",
    "likes": 10
}


test('blogs are returned as json', async () => {
   const response =  await api.get("/api/blogs")
   expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs have id field without underscore', async ()=>{
    const response = await api.get("/api/blogs")
    .catch(err=>console.log(err))
    expect(response.body[0].id).toBeDefined()
})

test("a blog can be added with post", async () => {
    let loginResponse = await api.post("/api/login").send(initialUsers[0])
    let token = loginResponse.body["token"].replace("Bearer ", "")
    await api.post("/api/blogs").set("Authorization", token)
    .send(newBlog)
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(initialBlogs.length+1)

})
test("a blog added with undefined likes has 0 likes", async ()=>{
    let loginResponse = await api.post("/api/login").send(initialUsers[0])
    let token = loginResponse.body["token"].replace("Bearer ", "")

    let zeroBlog = {...newBlog}
    delete zeroBlog["likes"]
    await api.post("/api/blogs").send(zeroBlog).set("Authorization", token)
    const response = await api.get("/api/blogs")
    expect(response.body[initialBlogs.length].likes).toBe(0)
})

test("a blog added with no title returns 400 bad request", async ()=>{
    let loginResponse = await api.post("/api/login").send(initialUsers[0])
    let token = loginResponse.body["token"].replace("Bearer ", "")

    let invalidBlog = {...newBlog}
    delete invalidBlog["title"]

    await api.post("/api/blogs").send(invalidBlog).set("Authorization", token)
    .expect(400)
})

test("a blog added with no author returns 400 bad request", async ()=>{
    let invalidBlog = {...newBlog}
    delete invalidBlog["author"]

    let loginResponse = await api.post("/api/login").send(initialUsers[0])
    let token = loginResponse.body["token"].replace("Bearer ", "")

    await api.post("/api/blogs").send(invalidBlog).set("Authorization", token)
    .expect(400)
})

test("blog can be deleted", async () => {
    let loginResponse = await api.post("/api/login").send(initialUsers[0])
    let token = loginResponse.body["token"].replace("Bearer ", "")
    let response = await api.get("/api/blogs")

    await api.delete(`/api/blogs/${response.body[0].id}`).set("Authorization", token)
    let new_response = await api.get("/api/blogs")
    expect(new_response.body).toHaveLength(initialBlogs.length-1)
})

test("blog can be updated", async () => {
    let response = await api.get("/api/blogs")
    let newBlog=response.body[0]
    let oldLikes = response.body[0].likes
    newBlog["likes"]=newBlog["likes"]+1
    let newResponse = await api.put(`/api/blogs/${response.body[0].id}`).send(newBlog)
    expect(newResponse.body.likes).toBe(oldLikes+1)
})

test("blog can't be posted if not logged in", async () => {
    await api.post("/api/blogs").send(newBlog).expect(401)
    let response = await api.get("/api/blogs")
    expect(response.body.length).toBe(initialBlogs.length)
})

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    await api.post("/api/users").send(initialUsers[0])
    await api.post("/api/users").send(initialUsers[1])

    let first_token = (await api.post("/api/login").send(initialUsers[0])).body.token
    await api.post("/api/blogs").send(initialBlogs[0]).set("Authorization", first_token)

    let second_token = (await api.post("/api/login").send(initialUsers[1])).body.token
    await api.post("/api/blogs").send(initialBlogs[1]).set("Authorization", second_token)
    

})

afterAll(async () => {
    await mongoose.connection.close()
})