import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.anecdotes)  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification[notification.length-1].content}    
    </div>
  )
}

export default Notification