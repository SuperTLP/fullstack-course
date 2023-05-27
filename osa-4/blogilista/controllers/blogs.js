const blogsRouter = require("express").Router()
const errorHandler=require("../utils/errorHandler")
const Blog=require("../models/blog")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")
const User = require("../models/user")


blogsRouter.get('/', async (request, response, next) => {
    let blogs = await Blog.find({})
    .catch(err => next(err))
  return response.json(blogs)
  }, errorHandler)

blogsRouter.post('/', async (request, response, next) => {
    if (request.user===null) {
      return response.status(401).json(
        {"error": "you need to be logged in in order to create blogs"})
    }
    let user = request.user
    const blog = new Blog(
      {"author": user.id, 
      "title": request.body.title,
      "url": request.body.url,
      "likes":0
    })

    const result = await blog.save()
    .catch(err => next(err))
    let author = await User.findById(user.id)
    author.blogs=author.blogs.concat(blog._id)
    await author.save()
    .catch(err => next(err))
    response.status(201).json(result)

}, errorHandler)

blogsRouter.delete('/:id', async (request, response, next) => {
  let blog = null
  try {
    blog=await Blog.findById(request.params.id)
  }
  catch {
    return response.status(404).json({"error":"specified blog does not exist"})
  }
  if (blog===null) {
    return response.status(404).json({"error": "specified blog does not exist"})
  }

  let user = request.user
  if (user===null) {
    return response.status(401).json({"error": "you need to be logged in to delete posts."})
  }
  if (blog.author===user.id) {
    await Blog.findByIdAndDelete(blog.id)
    .catch(err => next(err))
    return response.status(200).end()
  }
  return response.status(401).json({"error": "you can only remove your own posts."})
}, errorHandler)

blogsRouter.put('/:id', async (request, response, next) => {
  let newBlog={
    "title": request.body.title,
    "author": request.body.author,
    "url": request.body.url,
    "likes": request.body.likes
  }
  let user = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new:true, runValidators:true})
  .catch(err => next(err))
  if (user) {
    return response.json(user)
  }
}, errorHandler)

module.exports=blogsRouter

