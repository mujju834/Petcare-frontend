import React from 'react';
import './PetcareHome.css'; // Import the corresponding CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (


<footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-logo">
            <img className='petlogo' src="/images/logo.png" alt="Petcare Logo" />
          </div>
          <div className="footer-nav">
            <a >Home</a>
            <a >Services</a>
            <a >About Us</a>
            <a >Help</a>
          </div>
        </div>
        <div className="footer-bottom">
        <div className="social-links">
        <a  rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a  rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
            <p className='software'>Softwareengineering@yourpetcare.com</p>
          <div className="footer-legal">
            <a >Privacy Policy</a>
            <a >Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>

);
}

export default Footer;