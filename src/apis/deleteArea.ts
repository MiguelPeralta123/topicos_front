import { GridRowSelectionModel } from "@mui/x-data-grid"
import axios from "axios"

export const deleteAreas = async (ids: GridRowSelectionModel) =>{
    const token = localStorage.getItem( 'jwt_bride')
    const data = await axios.delete('https://web-production-20aed.up.railway.app/area', {
        data: ids, 
        headers: {'Authorization': `Bearer ${token}`}} )
    return data.data
}