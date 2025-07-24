// src/components/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouteLogin } from "../helper/RouteName";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
