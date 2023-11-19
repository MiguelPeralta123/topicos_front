import { Navigate } from "react-router-dom";

interface PublicRoutesProps{
    children: JSX.Element;
}
export const PublicRoutes = ({ children }: PublicRoutesProps) => {

    // const token = Cookies.get('jwt_bride');
    const token = localStorage.getItem( 'jwt_bride')
      return ( token ) ? <Navigate to='/dashboard'/> : children;
}
