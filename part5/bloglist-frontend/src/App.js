import { useEffect, useState, useRef } from 'react';
import blogServices from './services/blog';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import CreateBlogForm from './components/CreateBlogForm';
import './index.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [addedMsg, setAddedMsg] = useState(null);
  const blogRef = useRef()

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

  const handleCreateBlog = async (newObject) => {
    blogRef.current.visibleCreateBlog()
    const res = await blogServices.create(newObject)
    setBlogs(blogs.concat(res))
    setAddedMsg(`a new blog ${res.title} by ${res.author} added`)
    setTimeout(() => setAddedMsg(null), 5000)
    
  }

  const loggedInPage = () => {
    return (
      <div>
        <h1>blogs</h1>
        <Notification message={addedMsg} setClass={'addedAndUpdated'} />    
        {user.name} logged in
        <button onClick={logout}>logout</button>
        <Togglable buttonLabel='create new blog' ref={blogRef} >
          <CreateBlogForm createBlog={handleCreateBlog} />
        </Togglable>
        <Blog blogs={blogs} user={user} />
      </div>
  )}

  

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
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
