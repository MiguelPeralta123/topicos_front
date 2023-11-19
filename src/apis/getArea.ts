import axios from "axios"

export const getArea = async () =>{
    const token = localStorage.getItem( 'jwt_bride')
    const data = await axios.get('http://localhost:3001/area', {
        headers: {'Authorization': `Bearer ${token}`}})
    return data.data
}