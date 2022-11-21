import { useState } from "react"

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleCreateBlog = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <h1>create new</h1>
      <div>
        title:<input type='text' value={title} name='title' onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author:<input type='text' value={author} name='author' onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url:<input type='text' value={url} name='url' onChange={({ target }) => setURL(target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
  )}

export default CreateBlogForm