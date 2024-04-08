import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Parentloggedin.css'
import AppointmentForm from '../Appointment/AppointmentForm';

function Parentloggedin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('HOME'); // Default active tab
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleAppointClick = (doctorId) => {
    setSelectedDoctorId(doctorId); // Set the selected doctor's ID
    localStorage.setItem('selectedDoctorId', doctorId); 
    setShowAppointmentForm(true); // Show the form
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'SCHEDULE_APPOINTMENT') {
      setShowAppointmentForm(false); // Hide the form when switching to other tabs
    }
  };

  // Define content for each tab
  const HomeContent = () => {
    const [appointments, setAppointments] = useState([]);
  
    useEffect(() => {
      const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email from local storage
  
      const fetchAppointments = async () => {
        try {
          // Update the request URL to use the correct endpoint and include the userEmail as a query parameter
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/get-appointments-byemail?email=${encodeURIComponent(userEmail)}`);
          setAppointments(response.data); // Assuming the response directly contains the list of appointments
        } catch (error) {
          console.error('Failed to fetch appointments:', error);
        }
      };
  
      if (userEmail) {
        fetchAppointments();
      }
    }, []);

    const renderStatus = (status) => {
      let statusStyle = {
        color: 'black', // Default color
        fontWeight: 'bold'
      };
    
      switch (status) {
        case 'Pending':
          statusStyle.color = 'orange';
          break;
        case 'Approved':
          statusStyle.color = 'green';
          break;
        case 'Denied':
          statusStyle.color = 'red';
          break;
        default:
          // Default case, you can specify additional styling or leave it as is.
          break;
      }
    
      return <span style={statusStyle}>{status}</span>;
    };
  
    return (
      <div className="home-content">
        <h2>Upcoming Appointments</h2>
        <div className="appointments-list">
          {appointments.map((appointment, index) => (
            <div key={index} className="appointment-card">
              <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {appointment.appointmentTime}</p>
              <p><strong>Pet Name:</strong> {appointment.petDetails.petName}</p>
              <p><strong>Status:</strong> {renderStatus(appointment.status)}</p>

              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  

  const ScheduleAppointmentContent = ({ onAppointClick, showForm }) => {
    const [doctors, setDoctors] = useState([]);
  
    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/available-doctors`);
          setDoctors(response.data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
          // Handle error appropriately
        }
      };
  
      fetchDoctors();
    }, []);
  
    if (showForm) {
      // When showForm is true, return null to render nothing for this component
      return null;
    }
  
    return (
      <div>
        <h2>Available Doctors</h2>
        <div className="doctors-list">
          {doctors.map(doctor => (
            <div key={doctor._id} className="doctor-card">
              <div className="doctor-image">
                <img src='/images/doctor.png' alt={doctor.name} />
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>ID:</strong> {doctor.doctorId}</p>
                <button
                  className="appoint-button"
                  onClick={() => onAppointClick(doctor.doctorId)}
                >
                  APPOINT A DOCTOR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  const ViewAppointmentHistoryContent = () => {
    const [appointments, setAppointments] = useState([]);
  
    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/get-appointments`);
          setAppointments(response.data.appointments);
        } catch (error) {
          console.error('Error fetching appointments:', error);
          // Handle fetch error, e.g., show an error message
        }
      };
  
      fetchAppointments();
    }, []); // Empty dependency array to run only once on component mount
  
    return (
      <div>
        <h2>View Appointment History</h2>
        {appointments.length > 0 ? (
          <div className="appointment-history">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <h3>Appointment with Dr. {appointment.doctorId}</h3> {/* Adjust according to your data structure */}
                <p><strong>AppointmentId: </strong> {appointment.appointmentId}</p>
                <p><strong>Pet:</strong> {appointment.petDetails.petName}</p>
                <p><strong>Type:</strong> {appointment.petDetails.petType}</p>
                <p><strong>Age:</strong> {appointment.petDetails.age}</p>
                <p><strong>Weight:</strong> {appointment.petDetails.weight}kg</p>
                <p><strong>Appointment Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Appointment Time:</strong> {appointment.appointmentTime}</p>
                <p className={`status ${appointment.status.toLowerCase()}`}>
  <strong>Appointment Status:</strong> {appointment.status}
</p>

                {/* Include any other appointment details you want to display */}
              </div>
            ))}
          </div>
        ) : (
          <p>No appointment history found.</p>
        )}
      </div>
    );
  };

  

  const ViewPetInfoContent = () => {
    const [petInfo, setPetInfo] = useState([]);
  
    useEffect(() => {
      const fetchPetInfo = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/get-appointments`);
          // Assuming the pet details are part of the appointments response
          const pets = response.data.appointments.map(appointment => appointment.petDetails);
          setPetInfo(pets);
        } catch (error) {
          console.error('Error fetching pet info:', error);
          // Handle fetch error, e.g., show an error message
        }
      };
  
      fetchPetInfo();
    }, []);
  
    return (
      <div>
        <h2>View Pet Info</h2>
        <div className="pet-info-container">
          {petInfo.length > 0 ? (
            petInfo.map((pet, index) => (
              <div key={index} className="pet-info-card">
                <h3>{pet.petName}</h3>
                <p><strong>Type:</strong> {pet.petType}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Friendly:</strong> {pet.friendly ? 'Yes' : 'No'}</p>
              <p><strong>Human-Safety:</strong> {pet.humanSafety ? 'Yes' : 'No'}</p>
                <p><strong>Weight:</strong> {pet.weight}kg</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Allergies:</strong> {pet.allergies || 'None'}</p>
              </div>
            ))
          ) : (
            <p>No pet information found.</p>
          )}
        </div>
      </div>
    );
  };

  const UpdatePetInfoContent = () => {
    const [petNameSearch, setPetNameSearch] = useState('');
    const [petDetails, setPetDetails] = useState(null);
    const [updateData, setUpdateData] = useState({});
  
    // Function to fetch pet details by name
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/appointments-by-pet?petName=${encodeURIComponent(petNameSearch)}`);
        if (response.data.length > 0) {
          // Assuming you want to edit the first appointment that comes up
          setPetDetails(response.data[0].petDetails);
          setUpdateData(response.data[0].petDetails); // Initialize form with fetched pet details
        } else {
          setPetDetails(null);
          alert('No appointments found for the given pet name');
        }
      } catch (error) {
        console.error('Error fetching pet details:', error);
        alert('Pet details not found');
      }
    };
  
    // Function to handle changes in the update form
    const handleUpdateChange = (e) => {
      const { name, value, type, checked } = e.target;
      setUpdateData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    // Function to submit updated pet details
    const submitUpdate = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/update-pet-info-by-name/${petDetails.petName}`, updateData);
        alert('Pet info updated successfully!');
        setPetDetails(null);
        setUpdateData({});
    
        // If you want to clear the search field as well, reset petNameSearch state
        setPetNameSearch('');
        // Optionally, fetch and display the updated pet details again
      } catch (error) {
        console.error('Error updating pet info:', error);
        alert('Failed to update pet info');
      }
    };
  
    return (
      <div className="update-pet-info-container">
      <div>
        <h2>Update Pet Info</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter Pet's Name"
            value={petNameSearch}
            onChange={(e) => setPetNameSearch(e.target.value)}
          />
          <button onClick={fetchPetDetails}>Search</button>
        </div>
    
        {petDetails && (
          <form onSubmit={submitUpdate}>
            <div className="form-field">
              <label htmlFor="petType">Pet Type:</label>
              <input
                type="text"
                id="petType"
                name="petType"
                value={updateData.petType || ''}
                onChange={handleUpdateChange}
                placeholder="Pet Type"
              />
            </div>
            <div className="checkbox-container form-field">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="friendly"
                  checked={updateData.friendly || false}
                  onChange={handleUpdateChange}
                />
                Friendly
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="humanSafety"
                  checked={updateData.humanSafety || false}
                  onChange={handleUpdateChange}
                />
                Human Safety
              </label>
            </div>
            <div className="form-field">
              <label htmlFor="petName">Pet Name:</label>
              <input
                type="text"
                id="petName"
                name="petName"
                value={updateData.petName || ''}
                onChange={handleUpdateChange}
                placeholder="Pet Name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={updateData.age || ''}
                onChange={handleUpdateChange}
                placeholder="Age"
              />
            </div>
            <div className="form-field">
              <label htmlFor="weight">Weight:</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={updateData.weight || ''}
                onChange={handleUpdateChange}
                placeholder="Weight"
              />
            </div>
            <div className="form-field">
              <label htmlFor="gender">Gender:</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={updateData.gender || ''}
                onChange={handleUpdateChange}
                placeholder="Gender"
              />
            </div>
            <div className="form-field">
              <label htmlFor="allergies">Allergies:</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                value={updateData.allergies || ''}
                onChange={handleUpdateChange}
                placeholder="Allergies"
              />
            </div>
            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </div>
    

    );
  };
  
  

  // to logout
  const handleLogout = () => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to logout?");
  
    // Proceed with logout if the user confirms
    if (isConfirmed) {
      // Clear all local storage items
      localStorage.clear();
  
      // Redirect the user to the login page or home page
      window.location.href = '/login'; // Adjust the path as needed
    }
  };
  

  // Function to dynamically render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'HOME':
        return <HomeContent />;
      case 'SCHEDULE_APPOINTMENT':
        return <ScheduleAppointmentContent onAppointClick={handleAppointClick} showForm={showAppointmentForm} />;
      case 'VIEW_APPOINTMENT_HISTORY':
        return <ViewAppointmentHistoryContent />;
      case 'VIEW_PET_INFO':
        return <ViewPetInfoContent />;
      case 'UPDATE_PET_INFO':
        return <UpdatePetInfoContent />;
      default:
        return <HomeContent />; // Default to Home content
    }
  };

  return (
    <>
      <header className="petcare-header">
        <nav className="petcare-nav">
          <ul className="nav-list">
            <img className='petlogo' src="images/petparent.jpeg" alt="Petcare Logo" />
            <li className="nav-item" onClick={() => handleTabChange('HOME')}>HOME</li>
<li className="nav-item" onClick={() => handleTabChange('SCHEDULE_APPOINTMENT')}>Schedule Appointment</li>
<li className="nav-item" onClick={() => handleTabChange('VIEW_APPOINTMENT_HISTORY')}>View Appointment History</li>
<li className="nav-item" onClick={() => handleTabChange('VIEW_PET_INFO')}>View Pet Info</li>
<li className="nav-item" onClick={() => handleTabChange('UPDATE_PET_INFO')}>Update Pet Info</li>

          </ul>
          <div className="login-buttons">
            <button>{localStorage.getItem('Name')}</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </header>
      {showAppointmentForm && <AppointmentForm doctorId={selectedDoctorId} />}
      <main>
        {renderContent()}
      </main>
    </>
  );
}

export default Parentloggedin;
