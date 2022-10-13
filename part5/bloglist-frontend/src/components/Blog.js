import { useState } from "react"

const Blog = ({ blog, user }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
              {blog.likes}<br></br> 
              {user.name} 
            </div>)
          }
        </div>
      </div>
      
  )
}

export default Blog