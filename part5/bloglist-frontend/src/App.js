import { useEffect, useState } from 'react';
import blogServices from './services/blog';
import Blog from './components/Blog';
import Notification from './components/Notification';
import './index.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
  const [addedMsg, setAddedMsg] = useState(null);
  const [createBlogVisible, setCreateBlogVisible] = useState(false);

  useEffect(() => {
    blogServices.getAll().then(blogs => setBlogs(blogs));
  }, []);
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, []);

  const loginPage = () => (
    <div>
      <h1>Login to application</h1>
      <Notification message={addedMsg} setClass={'error'} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type='text' 
            value={username} 
            name='username' 
            onChange={({ target }) => setUsername(target.value)} 
          /> 
        </div>
        <div>
          password
          <input 
            type='password'
            value={password}
            name='password' 
            onChange={({ target }) => setPassword(target.value)} 
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await blogServices.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(res))
      blogServices.setToken(res.token)
      setUser(res)
      setUsername('')
      setPassword('')
    } catch (error) {
      setAddedMsg(error.response.data.error)
      setTimeout(() => setAddedMsg(null), 5000)
    }
  }
  const loggedInPage = () => {
    return (
      <div>
        <h1>blogs</h1>
        <Notification message={addedMsg} setClass={'addedAndUpdated'} />    
        {user.name} logged in
        <button onClick={logout}>logout</button>
        {createNewBlog()}
        {/* {createBlog()} */}
        <Blog blogs={blogs} />
          </div>
  )}
  const createBlog = () => (
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
    )
  
  const handleCreateBlog = async (e) => {
    e.preventDefault()
    const res = await blogServices.create({ title, author, url })
    setBlogs(blogs.concat(res))
    setAddedMsg(`a new blog ${res.title} by ${res.author} added`)
    setTimeout(() => setAddedMsg(null), 5000)
    setTitle('')
    setAuthor('')
    setURL('')
  }
  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }
  
  const createNewBlog = () => {
    const hideCreateBlog = { display: createBlogVisible ? 'none' : ''}
    const showCreateBlog = { display: createBlogVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideCreateBlog}>
          <button onClick={() => setCreateBlogVisible(!createBlogVisible)}>create blog</button>
        </div>
        <div style={showCreateBlog}>
          {createBlog()}
          <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
        {user === null 
        ? loginPage() 
        : loggedInPage()}
    </div>
  );
}

export default App;
