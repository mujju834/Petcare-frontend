import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of withRouter
import './PetcareHome.css';

function Navbar() {
  const navigate = useNavigate(); // Hook to access navigate function

  // Function to handle user type change and navigation
  const handleUserTypeChange = (userType) => {
    navigate('/login', { state: { userType } }); // Pass userType via state
  };

  return (
    <header className="petcare-header">
      <nav className="petcare-nav">
        <ul className="nav-list">
          <img className='petlogo' src="images/petlogo.jpeg" alt="Petcare Logo" />
          <li className="nav-item" onClick={() => navigate('/')}>HOME</li>
          <li className="nav-item" >SERVICES</li>
          <li className="nav-item" >ABOUT US</li>
          <li className="nav-item" >HELP</li>
        </ul>
        <div className="login-buttons">
          <button onClick={() => handleUserTypeChange('PetParent')}>Login as PetParent</button>
          <button onClick={() => handleUserTypeChange('Doctor')}>Login as Doctor</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
