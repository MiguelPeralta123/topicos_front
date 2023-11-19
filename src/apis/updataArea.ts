import axios from "axios"
import { IArea } from "../interface/area"

export const updataArea = async ( guest: IArea) =>{
    const token = localStorage.getItem( 'jwt_bride')
    const data = await axios.put(' http://localhost:3001/area', guest, {headers: {'Authorization': `Bearer ${token}`}} )
    return data.data
}