import { useEffect, useState } from 'react';
import blogServices from './services/blog';
import Blog from './components/Blog'

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogServices.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await blogServices.login({username, password})
    setUser(res)
    setUsername('')
    setPassword('')
  }
  const loginPage = () => {
    return (
      <div>
        <h1>Login to application</h1>
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
  }
  const loggedinPage = () => {
    return (
      <div>
        <h1>blogs</h1>
        <p>{user.name} logged in</p>
        <Blog blogs={blogs} />
      </div>
    )
  }
  
  return (
    <div>
      {
        user === null 
          ? loginPage()
          : loggedinPage()
      }  
    </div>
  );
}

export default App;
