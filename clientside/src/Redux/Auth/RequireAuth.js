import React from "react";
import { useSelector } from "react-redux";
import { setCurrentToken } from "./authSlice";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = useSelector(setCurrentToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
