import { useSelector, useDispatch } from 'react-redux'
import { hide } from '../reducers/notificationReducer'

const Notification = () => {

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const style = notification === null ? {display : 'none'} : { border: 'solid', padding: 10, borderWidth: 1 } 

  setTimeout(() => {
    dispatch(hide())    
  }, 5000)

  return (
    <div style={style}>
    {notification}
    </div>
  )
}

export default Notification