import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes"

export const getAll = () => axios.get(baseURL).then(res => res.data)


// export default { getAll }