import React, { useState } from 'react';
import axios from 'axios';
import './AppointmentForm.css'; // Make sure you have your CSS defined here

const AppointmentForm = ({ doctorId }) => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    petType: '',
    humanSafety: false, // you could use a boolean here instead
    friendly: false, // you could use a boolean here instead
    petName: '',
    age: '',
    weight: '',
    gender: '',
    allergies: '',
    appointmentDate: '', // Ensure this is initialized, possibly to today's date
  appointmentTime: '',
  });

  const userEmail = localStorage.getItem('userEmail');

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    setAppointmentDetails(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : e.target.value
    }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/appointments`, {
        ...appointmentDetails,
        doctorId,
        userEmail: localStorage.getItem('userEmail'),
        status: 'Pending'
      });
      alert(response.data.message);

      // erasing the values
      setAppointmentDetails({
        petType: '',
        humanSafety: false, // Resetting back to the initial state
        friendly: false,    // Resetting back to the initial state
        petName: '',
        age: '',
        weight: '',
        gender: '',
        allergies: '',
        appointmentDate: '', // Ensure this is initialized, possibly to today's date
  appointmentTime: '',
      });

      localStorage.removeItem('selectedDoctorId');


    } catch (error) {
      console.error('Error submitting appointment:', error);
      // Handle submission error
    }
  };
  

  return (
    <div className="appointment-form-container">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="petType"
          value={appointmentDetails.petType}
          onChange={handleChange}
          placeholder="Pet Type"
          required
        />
        <label>
          Human Safety:
          <input
            type="checkbox"
            name="humanSafety"
            checked={appointmentDetails.humanSafety}
            onChange={(e) => setAppointmentDetails(prevState => ({
              ...prevState,
              humanSafety: e.target.checked,
            }))}
          />
        </label>
        <label>
          Friendly:
          <input
            type="checkbox"
            name="friendly"
            checked={appointmentDetails.friendly}
            onChange={(e) => setAppointmentDetails(prevState => ({
              ...prevState,
              friendly: e.target.checked,
            }))}
          />
        </label>
        <input
          type="text"
          name="petName"
          value={appointmentDetails.petName}
          onChange={handleChange}
          placeholder="Pet Name"
          required
        />
        <input
          type="number"
          name="age"
          value={appointmentDetails.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <input
          type="number"
          name="weight"
          value={appointmentDetails.weight}
          onChange={handleChange}
          placeholder="Weight"
          required
        />
        <select
          name="gender"
          value={appointmentDetails.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          name="allergies"
          value={appointmentDetails.allergies}
          onChange={handleChange}
          placeholder="Allergies"
        />
        <input
  type="date"
  name="appointmentDate"
  value={appointmentDetails.appointmentDate}
  onChange={handleChange}
  required
/>

<input
  type="time"
  name="appointmentTime"
  value={appointmentDetails.appointmentTime}
  onChange={handleChange}
  required
/>

        <button type="submit">Submit Appointment</button>
      </form>
    </div>
  );
};
 

export default AppointmentForm;
