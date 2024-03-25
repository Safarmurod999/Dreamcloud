import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("access_token"))
  );
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
