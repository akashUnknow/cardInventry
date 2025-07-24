import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './Layout/Layout'
import { RouteAddInventory, RouteAdddgdata, RouteIdsp, RouteIndex, RouteLogin, RoutePersoCard, RouteUpdate, Routecardinventry } from './helper/RouteName';
import { RouteAddInventory, RouteAdddgdata, RouteBap, RouteBapCompleted, RouteBapGeneration, RouteBapHold, RouteBapReview, RouteIndex, RouteLogin, RoutePersoCard, RouteUpdate, Routecardinventry } from './helper/RouteName';
import Index from './Pages/Index';
import CardInventry from './Pages/CardInventry';
import AddInventory from './Pages/AddInventory';
import PersoCard from './Pages/PersoCard';
import Login from './Pages/Login';
import AddDgData from './Pages/AddDgData';
import Update from './Pages/Update';
import IdspBap from './Pages/IdspBap';
import Bap from './Pages/Bap';
import BAPcompleted from './Pages/BAPcompleted';
import BapUnderGeneration from './Pages/BapUnderGeneration';
import BapUnderReview from './Pages/BapUnderReview';
import BapHold from './Pages/BapHold';



const App = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route element={<Layout/>} path={RouteIndex} >
          <Route index element={<Index/>} />
          <Route path={Routecardinventry} element={<CardInventry />} />
          <Route path={RouteAddInventory} element={<AddInventory/>} />
          <Route path={RoutePersoCard} element={<PersoCard/>} />
          <Route path={RouteLogin} element={<Login/>} />
          <Route path={RouteAdddgdata} element={<AddDgData/>} />
          <Route path={RouteUpdate} element={<Update/>} />
          <Route path={RouteIdsp} element={<IdspBap/>} />
          <Route path={RouteBapCompleted} element={<BAPcompleted/>} />
          <Route path={RouteBapGeneration} element={<BapUnderGeneration/>} />
          <Route path={RouteBapReview} element={<BapUnderReview/>} />
          <Route path={RouteBapHold} element={<BapHold/>} />
          {/* Add more routes as needed */}
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
