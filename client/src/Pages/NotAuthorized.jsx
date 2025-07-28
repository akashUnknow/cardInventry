// src/Pages/NotAuthorized.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-6">
        You must be logged in to view this page.
      </p>
      <Link to="/Login">
        <Button className="bg-blue-600 hover:bg-blue-500">Go to Login</Button>
      </Link>
    </div>
  );
};

export default NotAuthorized;
