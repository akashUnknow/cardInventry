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

// Routes
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

const Navbar = () => {
  const dispatch = useDispatch();
  const sidebarRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <nav className="w-full bg-white shadow border-b px-4 py-3 fixed top-0 left-0 z-40">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-lg font-bold text-blue-600">
            <Link to={RouteIndex}>Simphony</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-6 items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-4">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={Routecardinventry} className="text-sm font-semibold hover:text-blue-600">Inventory</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={RouteAdddgdata} className="text-sm font-semibold hover:text-blue-600">Add DG Data</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={RouteUpdate} className="text-sm font-semibold hover:text-blue-600">Update</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={RouteIdsp} className="text-sm font-semibold hover:text-blue-600">IDSP</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={RouteBap} className="text-sm font-semibold hover:text-blue-600">BAP</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-sm font-semibold hover:text-blue-600">More</DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <Link to={RouteBapGeneration}><DropdownMenuItem>Under Generation</DropdownMenuItem></Link>
                        <Link to={RouteBapReview}><DropdownMenuItem>Under Review</DropdownMenuItem></Link>
                        <Link to={RouteBapHold}><DropdownMenuItem>Hold</DropdownMenuItem></Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User Info (Desktop) */}
          <div className="hidden sm:flex items-center gap-4">
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
              <HoverCardContent>
                {user?.email
                  ? `Logged in as ${user.email}`
                  : "Welcome to the platform"}
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 text-xl"
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
        <div className="flex flex-col gap-4 p-4">
          <Link to={Routecardinventry} className="text-sm font-semibold hover:text-blue-600" onClick={() => setMenuOpen(false)}>Inventory</Link>
          <Link to={RouteAdddgdata} className="text-sm font-semibold hover:text-blue-600" onClick={() => setMenuOpen(false)}>Add DG Data</Link>
          <Link to={RouteUpdate} className="text-sm font-semibold hover:text-blue-600" onClick={() => setMenuOpen(false)}>Update</Link>
          <Link to={RouteIdsp} className="text-sm font-semibold hover:text-blue-600" onClick={() => setMenuOpen(false)}>IDSP</Link>
          <Link to={RouteBap} className="text-sm font-semibold hover:text-blue-600" onClick={() => setMenuOpen(false)}>BAP</Link>
          <Link to={RouteBapGeneration} className="text-sm font-semibold hover:text-blue-600" onClick={() => setMenuOpen(false)}>Under Generation</Link>
          <Link to={RouteBapReview} className="text-sm font-semibold hover:text-blue-600" onClick={() => setMenuOpen(false)}>Under Review</Link>
          <Link to={RouteBapHold} className="text-sm font-semibold hover:text-blue-600" onClick={() => setMenuOpen(false)}>Hold</Link>
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
          className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
