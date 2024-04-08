import React from 'react';
import './PetcareHome.css'; // Make sure to create this CSS file in your project
import DoctorCarousel from './Doctorsslide';

import Navbar from './Navbar';
import Footer from './Footer';
import LoginComponent from './Login';

function PetcareHome() {
  return (
    <div className="petcare-home">

     {/* this is sample */}
     <Navbar />
{/* add navbar here */}
      <main className="petcare-main">
        <div className="hero">
          <img src="/images/Pet.webp"  alt="Happy Dog" />
          </div>
      </main>

      <div className="expectation-section">
  <h2>What to Expect</h2>
  <div className="expectation-cards-container">
    <div className="expectation-card">
      <img src="/images/apply.jpeg" alt="Apply" className="icon" />
      <h3>Apply</h3>
      <p>Embark on a seamless journey to unparalleled pet care by initiating your application through our streamlined client form. Upon receipt, our dedicated team will meticulously evaluate our capacity to ensure the highest standards of service. Expect a prompt response within a day, marking the first step towards a bespoke pet care experience.</p>
    </div>
    <div className="expectation-card">
      <img src="/images/consult.jpg" alt="Consultation" className="icon" />
      <h3>Consultation</h3>
      <p>Our introductory consultation embodies a perfect blend of convenience and thoroughness, conducted via Zoom 
        to respect your time and safety. This virtual meeting is designed to familiarize us with your pet’s
         environment and necessities, ensuring a personalized and comprehensive care plan tailored to your pet’s 
         unique needs.</p>
    </div>
    <div className="expectation-card">
      <img src="/images/beginservice.png" alt="Begin Services" className="icon" />
      <h3>Begin Services</h3>
      <p>As a valued member of our community, you gain exclusive access to our user-friendly scheduling portal, designed with your convenience in mind. Each interaction with your dedicated pet caretaker will be documented with detailed reports and vibrant, heartwarming photos that capture your pet's joyful moments, providing you with peace of mind and delightful updates.!</p>
    </div>
  </div>
</div>


      {/* <div className="services-container">
      <div className="service-card">
        <img src="/images/dog.jfif" alt="Dog Walking" />
        <h3>Daily Dog Walking</h3>
        <p>Regular Clients Paired with One Walker. All Walkers Fully Vetted and Trained. Individual Walks Puppy Service for Housebreaking.</p>
      </div>
      
      <div className="service-card">
        <img src="/images/dog.jfif" alt="Cat Sitting" />
        <h3>Daily Cat Sitting</h3>
        <p>Experienced Sitters with Cat Knowledge. All Sitters Fully Vetted and Trained. Emergency Care Available.</p>
      </div>
      
      <div className="service-card">
        <img src="/images/dog.jfif" alt="Company You Can Trust" />
        <h3>Hire a Company You Can Trust</h3>
        <p>Chicago Pet Sitters is dedicated to providing you with a service with whom you can form a long-term relationship.</p>
      </div>
      
      <div className="service-card">
        <img src="/images/dog.jfif" alt="Begin Services" />
        <h3>Begin Services</h3>
        <p>As a client of Chicago Pet Sitters, you will have access to our scheduling portal. You can expect daily reports from your walker or sitter, along with social-media-worthy photos!</p>
      </div>
    </div> */}

    {/* <DoctorCarousel /> */}

    {/* Footer */}
    <Footer />

    </div>
  );
}

export default PetcareHome;
