import React, { useState } from 'react';
import './Signup.css';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios'; // Import axios for making HTTP requests
const api = process.env.REACT_APP_API_URL;


function Signup() {
  const [formData, setFormData] = useState({
    role: '',
    username: '',
    email: '',
    password: '',
    name: '',
    city: '',
    phone: '',
    adminId: '',
    doctorId: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Filter out empty fields to avoid sending them for roles that don't require them
    const filteredData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ''));

    
    try {
      const response = await axios.post(`${api}/users/register`, filteredData);
      alert(response.data.message); // Show success message

      window.location.href = '/login';

    } catch (error) {
      alert(error.response?.data.message || 'An error occurred'); // Show error message from server
    }
  };

  const renderAdditionalFields = () => {
    switch (formData.role) {
      case 'Admin':
        return (
          <>
            <input type="text" name="adminId" placeholder="Admin ID" value={formData.adminId} onChange={handleChange} />
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          </>
        );
      case 'PetParent':
        return (
          <>
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          </>
        );
      case 'Doctor':
        return (
          <>
            <input type="text" name="doctorId" placeholder="Doctor ID" value={formData.doctorId} onChange={handleChange} />
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <div className="signup-form-container">
          <h2>Create account</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <select name="role" value={formData.role} className="role-select" onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="PetParent">Pet Parent</option>
              <option value="Doctor">Doctor</option>
            </select>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            {renderAdditionalFields()}
            <button type="submit">CREATE AN ACCOUNT</button>
          </form>
        </div>
        <div className="signup-info-container">
          <div className="info">
            <p>Take care of your Pets</p>
            <p>Book appointment any time</p>
          </div>
          <div className="login-redirect">
            <p>HAVE AN ACCOUNT?</p>
            <button onClick={() => window.location.href = '/login'}>CLICK HERE TO LOG IN</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
