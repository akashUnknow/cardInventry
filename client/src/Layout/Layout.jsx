import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/Pages/Navbar";

const Layout = () => {
  return (
    <main className="flex flex-col min-h-screen w-full bg-white">
      {/* Fixed or responsive navbar */}
      <Navbar />

      {/* Responsive Content Wrapper */}
      <div className="flex-1 overflow-y-auto bg-gray-100 px-4 py-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
