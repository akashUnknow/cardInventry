import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './Layout/Layout';
import ProtectedRoute from "./components/ProtectedRoute";

import {
  RouteIndex, RouteLogin,
  Routecardinventry, RouteAddInventory, RoutePersoCard,
  RouteAdddgdata, RouteUpdate,
  RouteIdsp, RouteBap, RouteBapCompleted,
  RouteBapGeneration, RouteBapReview, RouteBapHold
} from './helper/RouteName';

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

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />} path={RouteIndex}>
        <Route index element={<Index />} />
        <Route path={RouteLogin} element={<Login />} />

        {/* Protected routes */}
        <Route path={Routecardinventry} element={<ProtectedRoute><CardInventry /></ProtectedRoute>} />
        <Route path={RouteAddInventory} element={<ProtectedRoute><AddInventory /></ProtectedRoute>} />
        <Route path={RoutePersoCard} element={<ProtectedRoute><PersoCard /></ProtectedRoute>} />
        <Route path={RouteAdddgdata} element={<ProtectedRoute><AddDgData /></ProtectedRoute>} />
        <Route path={RouteUpdate} element={<ProtectedRoute><Update /></ProtectedRoute>} />
        <Route path={RouteIdsp} element={<ProtectedRoute><IdspBap /></ProtectedRoute>} />
        <Route path={RouteBap} element={<ProtectedRoute><Bap /></ProtectedRoute>} />
        <Route path={RouteBapCompleted} element={<ProtectedRoute><BAPcompleted /></ProtectedRoute>} />
        <Route path={RouteBapGeneration} element={<ProtectedRoute><BapUnderGeneration /></ProtectedRoute>} />
        <Route path={RouteBapReview} element={<ProtectedRoute><BapUnderReview /></ProtectedRoute>} />
        <Route path={RouteBapHold} element={<ProtectedRoute><BapHold /></ProtectedRoute>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
