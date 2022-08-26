// import '../index.css'

const Notification =({message})=>{
    
    if(message === null){
        return null
    }

    return <div className="addedAndUpdated">
                {message}
            </div>  
}

export default Notification