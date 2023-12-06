
import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { AppRoutes } from "./AppRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

export const AppRouter = () => {
  return (

    <Routes>
      <Route path="/*" element={
      <PublicRoutes>
        <AuthRoutes/>
      </PublicRoutes>
      }/>
      <Route path="/dashboard/*" element={
      <PrivateRoutes>
        <AppRoutes/>
      </PrivateRoutes>
      }/>
    </Routes>

  )
}
  