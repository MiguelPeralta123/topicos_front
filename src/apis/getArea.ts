import axios from "axios"

export const getArea = async () =>{
    const token = localStorage.getItem( 'jwt_bride')
    const data = await axios.get('https://web-production-20aed.up.railway.app/area', {
        headers: {'Authorization': `Bearer ${token}`}})
    return data.data
}