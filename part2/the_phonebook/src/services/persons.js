import axios from 'axios';

const baseUrl = "http://localhost:3001/api/persons";


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}

const update = (id, newContactInfo) => {
    const request = axios.put(`${baseUrl}/${id}`, newContactInfo)
    return request.then(res => res.data)
                    
}

const deleteObj = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => console.log('Deleted'))
    
}

const crud = {getAll, create, update, deleteObj}

export default crud