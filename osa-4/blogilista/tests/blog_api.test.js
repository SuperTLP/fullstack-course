const app = require("../app")
const mongoose = require("mongoose")
const supertest=require("supertest")
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        "title": "eka testi",
        "author": "Riku Mattila",
        "url": "https://www.youtube.com",
        "likes": 1
    },
    {
        "title": "toka testi",
        "author": "Kuningas Yrjö",
        "url": "https://test.com",
        "likes": 5
    }
]
let newBlog = 
{
    "title": "uusi blogi",
    "author": "tauno testaaja",
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
    await api.post("/api/blogs")
    .send(newBlog)
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(initialBlogs.length+1)

})
test("a blog added with undefined likes has 0 likes", async ()=>{
    let zeroBlog = {...newBlog}
    delete zeroBlog["likes"]
    await api.post("/api/blogs").send(zeroBlog)
    const response = await api.get("/api/blogs")
    expect(response.body[initialBlogs.length].likes).toBe(0)
})

test("a blog added with no title returns 400 bad request", async ()=>{
    let invalidBlog = {...newBlog}
    delete invalidBlog["title"]
    await api.post("/api/blogs").send(invalidBlog)
    .expect(400)
})

test("a blog added with no author returns 400 bad request", async ()=>{
    let invalidBlog = {...newBlog}
    delete invalidBlog["author"]
    await api.post("/api/blogs").send(invalidBlog)
    .expect(400)
})

test("blog can be deleted", async () => {
    let response = await api.get("/api/blogs")
    await api.delete(`/api/blogs/${response.body[0].id}`)
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

beforeEach(async () => {

  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

})

afterAll(async () => {
    await mongoose.connection.close()
})