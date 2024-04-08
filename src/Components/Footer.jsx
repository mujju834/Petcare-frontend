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
            <a href="/">Home</a>
            <a >Services</a>
            <a >About Us</a>
            <a >Help</a>
          </div>
        </div>
        <div className="footer-bottom">
        <div className="social-links">
        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
          <div className="footer-contact">
            <p>contact@yourpetcare.com</p>
            <p>+1 234 567 8900</p>
          </div>
          <div className="footer-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>

);
}

export default Footer;