import axios from "axios"
import { User } from "../interface/user"

export const loginApi = async ( user: User) =>{
    const data = await axios.post('https://bride-app-970bec4c8478.herokuapp.com/login', user)
    return data.data
}