import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/Pages/Navbar";

const Layout = () => {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Responsive Navbar */}
      <Navbar />

      {/* Content area that grows */}
      <div className="flex-1 bg-gray-100 overflow-auto px-4 py-6 sm:px-6 md:px-8">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
