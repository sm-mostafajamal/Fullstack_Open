import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes"

export const getAll = () => axios.get(baseURL).then(res => res.data)
export const create = (newAnec) => axios.post(baseURL, newAnec).then(res => res.data)
export const update = (updateAnecdote) => axios.put(`${baseURL}/${updateAnecdote.id}`, updateAnecdote).then(res => res.data)



// export default { getAll }