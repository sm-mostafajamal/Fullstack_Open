import { useState } from "react"

const Blog = ({ blog, user, updateBlog }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = () => {
    setLikes(++blog.likes)
    updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }
  
  return (
      <div style={blogStyle} key={blog.id}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setView(!view)}>{view ? 'hide' : "view" }</button><br></br>
          { view && (
            <div >
              {blog.title} {blog.author}
              {blog.url}<br></br>
              <div>
                likes {likes}
                <button onClick={handleLikes}>like</button> 
              </div>
              {user.name} 
            </div>)
          }
        </div>
      </div>
      
  )
}

export default Blog