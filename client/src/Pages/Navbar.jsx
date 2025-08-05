import React, { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log("User:", user);
    console.log("Is Authenticated:", isAuthenticated);
  }, [isAuthenticated, user]);

  return (
    <nav className="w-full bg-white shadow border-b px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo or App Name */}
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

        {/* Auth + User Info */}
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

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 border-t pt-4">
          <Link to={Routecardinventry} className="text-sm font-semibold hover:text-blue-600">Inventory</Link>
          <Link to={RouteAdddgdata} className="text-sm font-semibold hover:text-blue-600">Add DG Data</Link>
          <Link to={RouteUpdate} className="text-sm font-semibold hover:text-blue-600">Update</Link>
          <Link to={RouteIdsp} className="text-sm font-semibold hover:text-blue-600">IDSP</Link>
          <Link to={RouteBap} className="text-sm font-semibold hover:text-blue-600">BAP</Link>
          <Link to={RouteBapGeneration} className="text-sm font-semibold hover:text-blue-600">Under Generation</Link>
          <Link to={RouteBapReview} className="text-sm font-semibold hover:text-blue-600">Under Review</Link>
          <Link to={RouteBapHold} className="text-sm font-semibold hover:text-blue-600">Hold</Link>
          <Link
            to={RouteLogin}
            className="text-sm font-semibold hover:text-blue-600"
            onClick={() => isAuthenticated && dispatch(logout())}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
