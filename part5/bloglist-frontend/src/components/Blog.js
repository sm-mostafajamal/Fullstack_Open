import { useState } from "react"
import Toggleable from "./Togglable"

const Blog = ({ blogs, user }) => {
  const [view, setView] = useState(false)
  const [selectedUserDetails, setSelectedUserDetails] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShowClick = (e) => {
    setView(!view)
    setSelectedUserDetails(e)
  }
  const handleHideBtn = (e) => {
    setView(!view)
    setSelectedUserDetails('')
  }
  return (
    <div>
      {
        blogs.map(blog => 
          <div style={blogStyle} key={blog.id}>
            <div>
              { blog.id === selectedUserDetails.id ? 
                <div>
                  {blog.title} {blog.author}
                  <button onClick={handleHideBtn}>hide</button><br></br>
                  {selectedUserDetails.url}<br></br>
                  {selectedUserDetails.likes}<br></br> 
                  {user.name} 
                </div>
              : <div>
                  {blog.title} {blog.author}
                  <button onClick={() => handleShowClick(blog)}>view</button>
                </div>
              }
            </div>
          </div>
      )}
    </div>
  )
}

export default Blog