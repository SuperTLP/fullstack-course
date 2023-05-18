const blogsRouter = require("express").Router()
const errorHandler=require("../utils/errorHandler")
const Blog=require("../models/blog")

blogsRouter.get('/', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(err => next(err))
  }, errorHandler)

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(err => next(err))
}, errorHandler)

blogsRouter.delete('/:id', async (request, response, next) => {
  user = await Blog.findByIdAndRemove(request.params.id)
  .catch(err => next(err))
  console.log(user)
  if (user) {
    return response.status(200).end()
  }
  return response.status(400).end()
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

