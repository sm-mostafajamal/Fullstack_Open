import { useState, useDispatch } from '../AnecdoteContext'

const Notification = () => {
  const state = useState()
  const dispatch = useDispatch()
 
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  setTimeout(() => dispatch({ type: 'clear' }), 5000)
  return (
    <div style={state ? style : {display: 'none'}}>
      {state}
    </div>
  )
}

export default Notification
