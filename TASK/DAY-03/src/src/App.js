import logo from './logo.svg';
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Production from './pages/Production_list';
import Register from './pages/Register';


function App() {
  return (
   <>
   <BrowserRouter>

      <Routes>

       <Route path='/register' Component={Register}/>
       <Route path='/production_list' Component={Production}/>
       <Route path='/login' Component={Login}/>
       <Route path='/' Component={Login}/>


      </Routes> 
   </BrowserRouter>

   </>
  );
}

export default App;


