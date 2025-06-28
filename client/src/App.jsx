import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './Layout/Layout'
import { RouteAddInventory, RouteIndex, RoutePersoCard, Routecardinventry } from './helper/RouteName';
import Index from './Pages/Index';
import CardInventry from './Pages/CardInventry';
import AddInventory from './Pages/AddInventory';
import PersoCard from './Pages/PersoCard';



const App = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route element={<Layout/>} path={RouteIndex} >
          <Route index element={<Index/>} />
          <Route path={Routecardinventry} element={<CardInventry />} />
          <Route path={RouteAddInventory} element={<AddInventory/>} />
          <Route path={RoutePersoCard} element={<PersoCard/>} />
          {/* Add more routes as needed */}
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
