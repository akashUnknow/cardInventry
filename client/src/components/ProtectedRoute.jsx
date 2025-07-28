import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouteLogin, RouteNotAuth } from "../helper/RouteName";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={RouteNotAuth} replace />;
};

export default ProtectedRoute;
