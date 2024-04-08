import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Petcare from "./Components/PetcareHome";
import LoginComponent from "./Components/Login";
import Signup from "./Components/Singup";
import Parentloggedin from "./Components/Petparent/Parentloggedin";
import Doctorloggedin from "./Components/Doctor/Doctorloggedin";
import Adminloggedin from "./Components/Admin/Adminloggedin";


function App() {
  
  return (

    <Router>
      <div>
        <Routes>

          <Route path="/" element={<Petcare />} /> 
          {/* <Route path="/" element={<AppointmentForm />} />  */}
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Parentloggedin" element={<Parentloggedin />} />
          <Route path="/Doctorloggedin" element={<Doctorloggedin />} />
          <Route path="/Adminloggedin" element={<Adminloggedin/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
