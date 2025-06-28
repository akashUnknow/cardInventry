import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className=" w-full">
      <div className="w-full h-full bg-gray-100  pt-8 px-8">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
