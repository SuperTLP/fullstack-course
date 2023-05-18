const dummy = (blogs) => {
    return 1
  }
const totalLikes=(blogs)=>{
  return blogs.reduce((accumulator, current) => accumulator+current.likes, 0)
}
const favoriteBlog=(blogs)=>{
  return blogs.reduce((biggest, current) => current.likes > biggest.likes ? current : biggest, blogs[0])
}
const mostBlogs=(blogs) => {
  let written={}
  blogs.forEach(blog => {
    if (written[blog.author]===undefined) written[blog.author]=1
    else written[blog.author]+=1
  })
  let mostWritten = Object.keys(written).reduce((largest, current)=> {
    if (written[current]>written[largest]) return current
    return largest
  }, blogs[0].author)
  return {"author": mostWritten, "blogs": written[mostWritten]}
}

const mostLikes=(blogs) => {
  let likes={}
  blogs.forEach(blog => {
    if (likes[blog.author]===undefined) likes[blog.author]=0
    likes[blog.author]+=blog.likes
  })
  let mostLiked = Object.keys(likes).reduce((largest, current)=> {
    if (likes[current]>likes[largest]) return current
    return largest
  }, blogs[0].author)
  return {"author": mostLiked, "likes": likes[mostLiked]}
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}