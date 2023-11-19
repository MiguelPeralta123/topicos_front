import { createContext } from "react";
import { IArea } from "../interface/area";

interface IContext {
    areas: IArea[],
    setNewAreas: (areasFunc: IArea[]) => void,
    setNewAddedArea: (area: IArea) => void,
    logout: () => void
}
export const AppContext = createContext<IContext>({
    areas: [],
    setNewAreas: () => {},
    setNewAddedArea: () => {},
    logout: () => {},
})