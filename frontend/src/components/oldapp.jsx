import React from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Register from "./components/oldRegister"
import Login from "./components/oldLogin"
import Home from "./components/Home"
import All from "./components/All"
import Navbar from "./components/Navbar"

//import Dropdown from "./components/Dropdown";
function App() {
  return (
    <div>
       
      
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/All" element={<All />} />
      </Routes>
    </BrowserRouter>     
         
    
       
      
    </div>
  );
}

export default App;
