import axios from "axios"
import { User } from "../interface/user"

export const loginApi = async ( user: User) =>{
    const data = await axios.post('https://web-production-20aed.up.railway.app/login', user)
    return data.data
}