import axios from "axios"
import { IArea } from "../interface/area"

export const addArea = async ( guest: IArea) =>{
    const token = localStorage.getItem( 'jwt_bride')
    const data = await axios.post(' http://localhost:3001/area', guest, {headers: {'Authorization': `Bearer ${token}`}} )
    return data.data
}