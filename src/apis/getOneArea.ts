import axios from "axios"

export const getOneArea = async (id: string) =>{
    const data = await axios.post('https://web-production-20aed.up.railway.app/OneArea', {id})
    return data.data
}