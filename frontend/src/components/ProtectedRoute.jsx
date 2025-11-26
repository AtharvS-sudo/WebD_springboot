import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If not authenticated, redirect to the admin login page
    return <Navigate to="/admin/login" replace />;
  }

  return children; // If authenticated, render the component
};

export default ProtectedRoute;
