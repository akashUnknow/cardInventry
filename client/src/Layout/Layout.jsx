import React from "react";
import { Link, Outlet } from "react-router-dom";
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

const Layout = () => {
  return (
    <main className="w-full min-h-screen">
      {/* Top Navigation */}
      <div className="w-full bg-white shadow border-b py-4 px-8 ">
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
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to={RouteLogin}
                  className="font-semibold text-sm hover:text-blue-600"
                >
                  Login
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

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
                      <Link to={RouteBapCompleted}><DropdownMenuItem >completed</DropdownMenuItem></Link>
                      <Link to={RouteBapGeneration}><DropdownMenuItem >under-generation</DropdownMenuItem></Link>
                      <Link to={RouteBapReview}><DropdownMenuItem >under-review</DropdownMenuItem></Link>
                      <Link to={RouteBapHold}><DropdownMenuItem >Hold</DropdownMenuItem></Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Main Content */}
      <div className="p-8 bg-gray-100 min-h-screen overflow-hidden">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
