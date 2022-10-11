import { useState } from "react"

const Blog = ({ blogs, user }) => {
  const [view, setView] = useState(false)
  const [id, setId] = useState('null')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const hideDetails = { display : view ? 'none' : '' }
  const showDetails = { display : view ? '' : 'none' } 
  
  const handleClick = (b) => {
    setView(!view)
    setId(b.id)
  }

  return (
    <div>
      {
        blogs.map(blog => 
          
          <div style={blogStyle} key={blog.id}>
            <div> 
              {blog.title} {blog.author}
              <button  onClick={() => handleClick(blog)}>view</button>
                <button onClick={() => setView(!view)}>hide</button>

              {
                blog.id === id ?
              <div style={showDetails}>
                {blog.url} <br></br>
                {blog.likes} <br></br>
                {user.name}
              </div> : null
            }
            </div>
            

          </div>
          
      )}
    </div>
  )
}

export default Blog