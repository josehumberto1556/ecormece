import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UsuarioContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const nom=user.email
  console.log("Check user in Private: ", user);
  if (!nom) {
    return <Navigate to="/CuentaUsuario" />;
  }
  return children;
};

export default ProtectedRoute;
