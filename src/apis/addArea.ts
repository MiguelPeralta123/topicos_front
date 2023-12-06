import axios from "axios"
import { IArea } from "../interface/area"

export const addArea = async ( guest: IArea) =>{
    const token = localStorage.getItem( 'jwt_bride')
    const data = await axios.post('https://web-production-20aed.up.railway.app/area', guest, {headers: {'Authorization': `Bearer ${token}`}} )
    return data.data
}