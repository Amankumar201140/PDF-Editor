import { Routes,Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PersonalRoute from "./Components/PersonalRoute";
import { useState } from "react";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  return  (
    <div className="flex flex-col w-screen h-full bg-richblack-900">
      <Navbar isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn} />
      
  
      <Routes>
  
        <Route path="/" element = {<Home isLoggedIn={isLoggedIn}/>}/>
        <Route  path="/login" element={<Login setIsLoggedIn = {setIsLoggedIn}/>}/> 
        <Route path="/signup" element = {<Signup setIsLoggedIn = {setIsLoggedIn}/>}/>
        <Route path="/dashboard" element =  {
        <PersonalRoute isLoggedIn={isLoggedIn}>
          <Dashboard/>
        </PersonalRoute>
        } />
      </Routes>
    </div>
  )
}

export default App;
