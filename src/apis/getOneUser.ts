import axios from "axios"

export const getOneGuest = async (id: string) =>{
    const data = await axios.post('http://localhost:3001/OneGuest', {id})
    return data.data
}