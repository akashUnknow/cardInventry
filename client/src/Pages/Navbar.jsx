import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice.jsx";

import {
  RouteIndex,
  Routecardinventry,
  RouteAdddgdata,
  RouteUpdate,
  RouteBap,
  RouteBapGeneration,
  RouteBapReview,
  RouteBapHold,
  RouteIdsp,
  RouteLogin,
} from "@/helper/RouteName";
import { SearchInput } from "@/components/SearchInput.jsx";

const Navbar = () => {
  const dispatch = useDispatch();
  const sidebarRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full bg-white shadow border-b px-4 py-3 fixed top-0 left-0 z-40">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-lg font-bold text-blue-600">
            <Link to={RouteIndex}>Simphony</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-4">
                {[
                  { label: "Inventory", route: Routecardinventry },
                  { label: "Add DG Data", route: RouteAdddgdata },
                  { label: "Update", route: RouteUpdate },
                  { label: "IDSP", route: RouteIdsp },
                  { label: "BAP", route: RouteBap },
                ].map((item) => (
                  <NavigationMenuItem key={item.route}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.route}
                        className="text-sm font-semibold hover:text-blue-600"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Dropdown under More */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-sm font-semibold hover:text-blue-600">
                        More
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <Link to={RouteBapGeneration}>
                          <DropdownMenuItem>Under Generation</DropdownMenuItem>
                        </Link>
                        <Link to={RouteBapReview}>
                          <DropdownMenuItem>Under Review</DropdownMenuItem>
                        </Link>
                        <Link to={RouteBapHold}>
                          <DropdownMenuItem>Hold</DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* 🔎 Search bar on desktop */}
            <div className="w-64">
              <SearchInput
                onChange={(val) => console.log( val)}
                onSearch={(val) => console.log( val)}
                onClear={() => console.log()}
              />
            </div>

            <Link
              to={RouteLogin}
              className="text-sm font-semibold hover:text-blue-600"
              onClick={() => isAuthenticated && dispatch(logout())}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Link>

            <HoverCard>
              <HoverCardTrigger className="cursor-pointer font-semibold text-sm">
                {user?.name || user?.username || "Guest"}
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                {user?.email
                  ? `Logged in as ${user.email}`
                  : "Welcome to the platform"}
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Mobile Menu */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-4 border-b font-bold text-lg text-blue-600">
          Simphony
        </div>

        {/* 🔎 Search bar inside mobile sidebar */}
        <div className="p-4">
          <SearchInput
            onChange={(val) => console.log("typing:", val)}
            onSearch={(val) => console.log("search submitted:", val)}
            onClear={() => console.log("cleared")}
          />
        </div>

        <div className="flex flex-col gap-4 p-4">
          {[
            { label: "Inventory", route: Routecardinventry },
            { label: "Add DG Data", route: RouteAdddgdata },
            { label: "Update", route: RouteUpdate },
            { label: "IDSP", route: RouteIdsp },
            { label: "BAP", route: RouteBap },
            { label: "Under Generation", route: RouteBapGeneration },
            { label: "Under Review", route: RouteBapReview },
            { label: "Hold", route: RouteBapHold },
          ].map((item) => (
            <Link
              key={item.route}
              to={item.route}
              className="text-sm font-semibold hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to={RouteLogin}
            className="text-sm font-semibold hover:text-blue-600"
            onClick={() => {
              if (isAuthenticated) dispatch(logout());
              setMenuOpen(false);
            }}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Link>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
