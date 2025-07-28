import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "@/Pages/Navbar";

const Layout = () => {
  return (
    <main className="flex flex-col h-full w-full">
      {/* Fixed or Sticky Navbar */}

      {/* Main Content Area */}
      <Navbar />
      <div className="flex-1 bg-gray-100 overflow-auto px-4 py-6">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
