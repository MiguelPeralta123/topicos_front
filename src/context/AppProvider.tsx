import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { IArea } from "../interface/area";
import { getArea } from "../apis/getArea";
import { useNavigate } from "react-router-dom";

export const AppProvider = ({ children }: any) => {
    const [ areas, setArea ]= useState<IArea[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () =>{
          const data = await getArea() 
          setArea(data)
        }
        getData()
      }, [])
      
      const setNewAreas = (areasFunc: IArea[] ) =>{
        setArea(areasFunc)
        }

      const setNewAddedArea = ( area: IArea ) =>{
          const newAreas = [...areas, area]
          setArea(newAreas)
      }
    
      const logout = () => {
        localStorage.removeItem('jwt_bride')
        navigate("/login")
      }

    return (
     <AppContext.Provider value={{areas, setNewAreas, setNewAddedArea, logout}}>
        { children }
     </AppContext.Provider>
    )
}