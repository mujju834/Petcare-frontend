import React, { useState } from 'react';
import './LoginComponent.css';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function LoginComponent() {
  const api= process.env.REACT_APP_API_URL;

  const location = useLocation();
  const userType = location.state?.userType || 'PetParent'; // Read userType from location state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/users/login`, {
        email,
        password,
        loginAs: userType // Send the userType as loginAs
      });
      alert(response.data.message);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', response.data.user.role);
      localStorage.setItem('Name', response.data.user.username);

      const { role, doctorId } = response.data.user;
    localStorage.setItem('doctorId', doctorId);
    console.log(role);
  
      // Assuming the server's response includes the user's role in the user object
      const userRole = response.data.user.role.toLowerCase();
  
      // Redirect based on the user's role
      switch (userRole) {
        case 'admin':
          window.location.href = '/Adminloggedin'; // Redirect to the admin dashboard
          break;
        case 'petparent':
          window.location.href = '/Parentloggedin'; // Redirect to the pet parent dashboard
          break;
        case 'doctor':
          window.location.href = '/Doctorloggedin'; // Redirect to the doctor dashboard
          break;
        default:
          console.log('Unrecognized contact support');
      }
    } catch (error) {
      alert(error.response?.data.message || 'Login failed');
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-section">
          <h2>Login as {userType}</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">LOG IN</button>
          </form>
        </div>
        <div className="new-customers-section">
          <h2>New customers</h2>
          <p>Set up an account with us and you will be able to:</p>
          <ul>
            <li>Book Appointment</li>
            <li>Track your Appointment</li>
          </ul>
          <button type="button" onClick={() => window.location.href = '/signup'}>CREATE AN ACCOUNT</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginComponent;
