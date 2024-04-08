import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './DoctorCarousel.css'; // Your custom CSS file

export default function DoctorCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className='container'>
      <h2>Top-rated Doctor's in India</h2>
      <Slider {...settings}>
        {/* Add more slides here */}
        <div className='card'>
          <img src='/images/doctors.jfif' alt='Doctor Suman Ray' />
          <h3>DR. Suman Ray</h3>
          <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button>BOOK APPOINTMENT</button>
        </div>
        {/* Repeat for other doctors */}
      </Slider>
    </div>
  );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }
  
