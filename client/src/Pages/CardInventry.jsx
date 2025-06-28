import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RouteAddInventory, RoutePersoCard } from "@/helper/RouteName";
const CardInventry = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-150 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Card Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center gap-2.5 text-2xl font-bold">
          <p>Number of card :</p>
          <p>200</p>
        </CardContent>
        <CardFooter className="flex flex-row items-center gap-2.5 ">
          <p>Search Product</p>
          <select className="w-70 p-2 border border-gray-300 rounded-md">
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
          </select>
          <Button className="mx-5 bg-blue-800 hover:bg-blue-400">Search</Button>
        </CardFooter>

         <CardContent className="flex flex-row items-center gap-2.5 text-2xl font-bold justify-center">
          <Link to={RouteAddInventory}><Button className="mx-5 bg-blue-800 hover:bg-blue-400">Add Inventory</Button></Link>
          <Link to={RoutePersoCard}><Button className="mx-5 bg-blue-800 hover:bg-blue-400">Perso Card</Button></Link>
           
        </CardContent>


      </Card>
    </div>
  );
};

export default CardInventry;
