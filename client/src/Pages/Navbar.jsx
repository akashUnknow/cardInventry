import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Routes
import {
  RouteIndex,
  Routecardinventry,
  RouteAddInventory,
  RoutePersoCard,
  RouteLogin,
  RouteAdddgdata,
  RouteUpdate,
  RouteBap,
  RouteBapCompleted,
  RouteBapGeneration,
  RouteBapReview,
  RouteBapHold,
  RouteIdsp,
} from "@/helper/RouteName";
import { useSelector, useDispatch } from "react-redux";
// Import the logout action from your authSlice
import { logout } from "../redux/slices/authSlice.jsx";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    console.log("User:", user);
    console.log("Is Authenticated:", isAuthenticated);
    // You can add any side effects here if needed
  }, [isAuthenticated, user]);
  return (
    <div className="w-full bg-white shadow border-b py-4 px-8 flex justify-between items-center">
      <div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to={RouteIndex}
                  className="font-semibold text-sm hover:text-blue-600"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Inventory Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to={Routecardinventry}
                  className="font-semibold text-sm hover:text-blue-600"
                >
                  Inventory
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Perso Card */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to={RoutePersoCard}
                  className="font-semibold text-sm hover:text-blue-600"
                >
                  Perso Card
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Add DG Data */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to={RouteAdddgdata}
                  className="font-semibold text-sm hover:text-blue-600"
                >
                  Add DG Data
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Update */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to={RouteUpdate}
                  className="font-semibold text-sm hover:text-blue-600"
                >
                  Update
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Login */}

            {/* IDSP*/}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to={RouteIdsp}
                  className="font-semibold text-sm hover:text-blue-600"
                >
                  IDSP
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* BAp*/}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to={RouteBap}
                  className="font-semibold text-sm hover:text-blue-600"
                >
                  Bap
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* dropdown  */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {/* <Link to={RouteBapCompleted}>
                      <DropdownMenuItem>completed</DropdownMenuItem>
                    </Link> */}
                    <Link to={RouteBapGeneration}>
                      <DropdownMenuItem>under-generation</DropdownMenuItem>
                    </Link>
                    <Link to={RouteBapReview}>
                      <DropdownMenuItem>under-review</DropdownMenuItem>
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

      <div className="flex items-center gap-4">
        <div>
          <NavigationMenu>
            {/* <NavigationMenuItem> */}
            <NavigationMenuLink asChild>
              <Link
                to={RouteLogin}
                className="font-semibold text-sm hover:text-blue-600"
                onClick={() => {
                  if (isAuthenticated) {
                    dispatch(logout());
                  }
                }}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </Link>
            </NavigationMenuLink>
            {/* </NavigationMenuItem> */}
          </NavigationMenu>
        </div>
        <div>
          <HoverCard>
            <HoverCardTrigger className="cursor-pointer font-semibold">
              {user?.name || user?.username || "Guest"}
            </HoverCardTrigger>
            <HoverCardContent>
              {user?.email
                ? `Logged in as ${user.email}`
                : "The React Framework – created and maintained by @vercel."}
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
