const Notification = ({ message, setClass }) => {
  if(message === null) {
    return null
  }
  return <div className={setClass}>
          {message}
        </div>
}

export default Notification;