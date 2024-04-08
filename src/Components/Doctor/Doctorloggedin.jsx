import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Doctorloggedin.css';

function Doctorloggedin() {
  const api = process.env.REACT_APP_API_URL;
  
  const [activeTab, setActiveTab] = useState('HOME'); // Default active tab

 
  const HomeContent = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const doctorId = localStorage.getItem('doctorId');  // Retrieving doctorId from local storage
    
      const fetchAppointments = async () => {
        setIsLoading(true);
        try {
          // Using the new endpoint that accepts doctorId as a URL parameter
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/appointments/by-doctor/${doctorId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,  // Include this if your API requires authentication
            },
          });
          setAppointments(response.data);  // Assuming the response directly contains the list of appointments
        } catch (error) {
          console.error('Error fetching appointments:', error);
          setError('No appointments found for you');
        } finally {
          setIsLoading(false);
        }
      };
    
      if (doctorId) {
        fetchAppointments();
      }
    }, []);  // Dependency array is empty to ensure effect runs only once on mount
  
    if (isLoading) return <div>Loading appointments...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div>
        <h2>Upcoming Appointments</h2>
        <div className="appointments-list">
          {appointments.map((appointment, index) => (
            <div key={index} className="appointment-card">
              <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Pet Name:</strong> {appointment.petDetails.petName}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingAppointmentId, setEditingAppointmentId] = useState(null);


    const handleConfirm = async (appointmentId) => {
      try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users/appointments/${appointmentId}/confirm`);
        if (response.status === 200) {
          // Update the local state to reflect the new status
          setAppointments(currentAppointments =>
            currentAppointments.map(appointment =>
              appointment.appointmentId === appointmentId ? { ...appointment, status: 'Approved' } : appointment
            )
          );
          // Exit editing mode
          setEditingAppointmentId(null);
          alert(`Confirmed appointment with ID: ${appointmentId}`);
        }
      } catch (error) {
        console.error('Error confirming the appointment:', error);
      }
    };
    
    const handleDeny = async (appointmentId) => {
      try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users/appointments/${appointmentId}/deny`);
        if (response.status === 200) {
          // Update the local state to reflect the new status
          setAppointments(currentAppointments =>
            currentAppointments.map(appointment =>
              appointment.appointmentId === appointmentId ? { ...appointment, status: 'Denied' } : appointment
            )
          );
          // Exit editing mode
          setEditingAppointmentId(null);
          alert(`Denied appointment with ID: ${appointmentId}`);
        }
      } catch (error) {
        console.error('Error denying the appointment:', error);
      }
    };
    
    
  
  
    useEffect(() => {
      const doctorId = localStorage.getItem('doctorId');  // Retrieving doctorId from local storage
    
      const fetchAppointments = async () => {
        setIsLoading(true);
        try {
          // Using the new endpoint that accepts doctorId as a URL parameter
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/appointments/by-doctor/${doctorId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,  // Include this if your API requires authentication
            },
          });
          setAppointments(response.data);  // Assuming the response directly contains the list of appointments
        } catch (error) {
          console.error('Error fetching appointments:', error);
          setError('No Appointments found for you');
        } finally {
          setIsLoading(false);
        }
      };
    
      if (doctorId) {
        fetchAppointments();
      }
    }, []);  // Dependency array is empty to ensure effect runs only once on mount
    
  
    if (isLoading) return <div>Loading appointments...</div>;
    if (error) return <div>Error: {error}</div>;

  
    return (
      <div>
      <h2 className="appointments-heading">View Appointment</h2>
      <div className="appointments-container">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.appointmentId} className="appointment-card">
              <div>
                <p><label>AppointmentId:</label> {appointment.appointmentId}</p>
                <p><label>Pet:</label> {appointment.petDetails.petName}</p>
                <p><label>Type:</label> {appointment.petDetails.petType}</p>
              </div>
              <div className="hidden-details">
                <p><label>Age:</label> {appointment.petDetails.age}</p>
                <p><label>Weight:</label> {appointment.petDetails.weight}kg</p>
                <p><label>Appointment Status:</label> {appointment.status}</p>
                <p><label>Gender:</label> {appointment.petDetails.gender}</p>
                <p><label>Allergies:</label> {appointment.petDetails.allergies}</p>
                <p><label>Pet-Parent Name:</label> {appointment.petParentDetails.username}</p>
                <p><label>Pet-Parent Email:</label> {appointment.petParentDetails.email}</p>
                <p><label>Pet-Parent Phone:</label> {appointment.petParentDetails.phone}</p>
                <div className="appointment-actions">
  {editingAppointmentId === appointment.appointmentId ? (
    <>
      <button onClick={() => handleConfirm(appointment.appointmentId)} className="confirm-btn">
        Confirm Appointment
      </button>
      <button onClick={() => handleDeny(appointment.appointmentId)} className="deny-btn">
        Deny Appointment
      </button>
      <button onClick={() => setEditingAppointmentId(null)} className="cancel-btn">
        Cancel
      </button>
    </>
  ) : (
    <>
      {appointment.status === 'Approved' && (
        <button className="confirm-btn">
          Appointment Approved
        </button>
      )}
      {appointment.status === 'Denied' && (
        <button className="deny-btn">
          Appointment Declined
        </button>
      )}
     
      <button onClick={() => setEditingAppointmentId(appointment.appointmentId)} className="edit-btn">
        Edit Appointment
      </button>
    </>
  )}
</div>


              </div>
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>



    </div>
  );
};



const PetInfo = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const doctorId = localStorage.getItem('doctorId');
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${api}/users/get-appointments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Doctor-ID': doctorId,
          },
        });
        // Filter for appointments that are both associated with the doctor and approved
        console.log(response);
        response.data.appointments.forEach(appointment => {
          console.log(appointment.status, appointment.doctorId);  // Check each appointment's status and doctorId
        });

        const confirmedAppointments = response.data.appointments.filter(appointment => 
          appointment.status === 'Approved'
        );
        if (response.data.appointments.length > 0) {
          console.log(response.data.appointments[0]);  // Log the first appointment object
        }
  
        
        console.log(confirmedAppointments);
        setAppointments(confirmedAppointments);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setError('Failed to fetch appointments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading pet info...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Pet Info</h2>
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <div key={index} className="pet-info-card">
            <h3>Pet Name: {appointment.petDetails.petName}</h3>
            {/* Additional pet details here */}
            <p>Type: {appointment.petDetails.petType}</p>
            <p>Age: {appointment.petDetails.age} years</p>
            <p>Weight: {appointment.petDetails.weight} kg</p>
            <p>Gender: {appointment.petDetails.gender}</p>
            <p>Allergies: {appointment.petDetails.allergies}</p>
            {/* <p>Allergies: {appointment.petDetails.allergies ? appointment.petDetails.allergies.join(', ') : 'None'}</p> */}
            {/* You can add more details similarly */}
          </div>
        ))
      ) : (
        <div>No confirmed pet info available.</div>
      )}
    </div>
  );
};







const PetHistory = () => {
  const [petHistories, setPetHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPetHistories = async () => {
      const doctorId = localStorage.getItem('doctorId'); // Retrieve doctorId from localStorage
      try {
        const response = await axios.get(`${api}/users/fetch-pethistory?doctorId=${doctorId}`);
        setPetHistories(response.data.appointments);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pet histories:', err);
        setError('Failed to fetch pet histories');
        setLoading(false);
      }
    };

    fetchPetHistories();
  }, []);

  if (loading) return <div>Loading pet histories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pet-history-container">
      <h2 className="pet-history-title">Pet History</h2>
      {petHistories.length > 0 ? (
        petHistories.map((appointment, index) => (
          <div key={index} className="pet-history-card">
            <h3>{appointment.petDetails.petName}</h3>
            {/* Display other pet details here */}
            <p className="prescription">Prescription: {appointment.petDetails.prescription}</p>
          </div>
        ))
      ) : (
        <p className="no-history">No pet histories found.</p>
      )}
    </div>
  );
};

  
  const Prescription = () => {
    const [appointmentId, setAppointmentId] = useState('');
    const [petDetails, setPetDetails] = useState(null);
    const [prescription, setPrescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const fetchPetDetails = async (id) => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${api}/users/appointments/${id}`);
        setPetDetails(response.data);
        console.log(response.data); // For debugging
      } catch (err) {
        console.error("Error fetching pet details:", err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleSearch = () => {
      if (!appointmentId) {
        setError('Please enter an Appointment ID.');
        return;
      }
      fetchPetDetails(appointmentId);
    };
  
    const handlePrescribe = async () => {
      if ( !prescription) {
        setError('Please fill in the prescription fields.');
        return;
      }
      setLoading(true);
      setError('');
      try {
        const response = await axios.post(`${api}/users/appointments/${appointmentId}/prescription`, { prescription });
        console.log(response.data); // For debugging
        // Reset prescription state if successful
        setPrescription('');
        alert('Prescribed Medicines successfully'); // Alert or set another state to show success
      } catch (err) {
        console.error("Error saving prescription:", err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="prescription-container">
        <h2>Prescription</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          className="input-field"
          type="text"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
          placeholder="Enter Appointment ID"
          disabled={loading}
        />
        <button className="button" onClick={handleSearch} disabled={loading}>
          Search
        </button>
        {petDetails && (
          <div>
            <div className="details-block">
              <h3>Pet Details:</h3>
              <p><strong>Name:</strong> {petDetails.petDetails.petName}</p>
              <p><strong>Type:</strong> {petDetails.petDetails.petType}</p>
              <p><strong>Gender:</strong> {petDetails.petDetails.gender}</p>
              <p><strong>Allergies:</strong> {petDetails.petDetails.allergies}</p>
              {/* ... other pet details ... */}
            </div>
            <textarea
              className="prescription-textarea"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Enter prescription here"
              disabled={loading}
            />
            <button className="button" onClick={handlePrescribe} disabled={loading || !petDetails}>
              Prescribe
            </button>
          </div>
        )}
      </div>
    );
  };
  
  
  
  const UpdatePetInfo = () => {
    const [petName, setPetName] = useState('');
    const [petDetails, setPetDetails] = useState(null);
    const [updatedPetDetails, setUpdatedPetDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleSearch = async () => {
      setLoading(true);
      setError('');
      try {
        // Replace with your actual endpoint. This endpoint should return all pets matching the given name
        const response = await axios.get(`${api}/users/pets/${petName}`);
        setPetDetails(response.data);
        // Initialize updatedPetDetails with the current pet details here
        setUpdatedPetDetails(response.data); // Assuming response.data contains the pet details object
      } catch (err) {
        console.error("Error fetching pet details:", err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };
    
  
    const handleUpdate = async () => {
      setLoading(true);
      setError('');
      try {
        // Replace with your actual endpoint. This endpoint should update pet details for all pets with the given name
        const response = await axios.put(`${api}/users/pets/${petName}/update`, updatedPetDetails);
        alert('Pet details updated successfully'); // Or handle the success response more gracefully
        console.log(response);
      } catch (err) {
        console.error("Error updating pet details:", err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="update-pet-container">
        <h2>Update Pet Info</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Enter Pet Name"
          disabled={loading}
        />
        <button className="button" onClick={handleSearch} disabled={loading}>
          Search
        </button>
        {petDetails && (
          <div>
  {petDetails && petDetails.map((pet, index) => (
  <div key={index} className="pet-details">
    <input
      type="text"
      value={updatedPetDetails.petName} // Use updatedPetDetails here
      onChange={(e) => setUpdatedPetDetails(prevState => ({
        ...prevState,
        petName: e.target.value
      }))}
      placeholder="Pet Name"
    />
      <input
        type="text"
        value={updatedPetDetails.petType || pet.petType}
        onChange={(e) => setUpdatedPetDetails({ ...updatedPetDetails, petType: e.target.value })}
        placeholder="Pet Type"
      />
      <input
  type="checkbox"
  checked={updatedPetDetails.friendly}
  onChange={(e) => setUpdatedPetDetails(prevState => ({
    ...prevState,
    friendly: e.target.checked
  }))}
/> Friendly

      <input
        type="checkbox"
        checked={updatedPetDetails.humanSafety ?? pet.humanSafety}
        onChange={(e) => setUpdatedPetDetails({ ...updatedPetDetails, humanSafety: e.target.checked })}
      /> Human Safety
      <input
        type="number"
        value={updatedPetDetails.age || pet.age}
        onChange={(e) => setUpdatedPetDetails({ ...updatedPetDetails, age: e.target.value })}
        placeholder="Age"
      />
      <input
        type="number"
        value={updatedPetDetails.weight || pet.weight}
        onChange={(e) => setUpdatedPetDetails({ ...updatedPetDetails, weight: e.target.value })}
        placeholder="Weight"
      />
      <input
        type="text"
        value={updatedPetDetails.gender || pet.gender}
        onChange={(e) => setUpdatedPetDetails({ ...updatedPetDetails, gender: e.target.value })}
        placeholder="Gender"
      />
      <input
        type="text"
        value={updatedPetDetails.allergies || pet.allergies}
        onChange={(e) => setUpdatedPetDetails({ ...updatedPetDetails, allergies: e.target.value })}
        placeholder="Allergies"
      />
    </div>
  ))}
  <button className="button" onClick={handleUpdate} disabled={loading}>
    Update Details
  </button>
</div>

        )}
      </div>
    );
  };



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
      case 'APPOINTMENT':
        return <Appointment />;
      case 'PET_INFO':
        return <PetInfo />;
      case 'PET_HISTORY':
        return <PetHistory />;
      case 'PRESCRIPTION':
        return <Prescription />;
      case 'UPDATE_PET_INFO':
        return <UpdatePetInfo />;
      default:
        return <HomeContent />; // Default to Home content
    }
  };
  

  return (
    <>
      <header className="petcare-header">
        <nav className="petcare-nav">
        <ul className="nav-list">
  <img className='petlogo' src="images/doctor.png" onClick={() => setActiveTab('HOME')} alt="Doctor Logo" />
  <li className="nav-item" onClick={() => setActiveTab('APPOINTMENT')}>Appointment</li>
  <li className="nav-item" onClick={() => setActiveTab('PET_INFO')}>Pet Info</li>
  <li className="nav-item" onClick={() => setActiveTab('PET_HISTORY')}>Pet History</li>
  <li className="nav-item" onClick={() => setActiveTab('PRESCRIPTION')}>Prescription</li>
  <li className="nav-item" onClick={() => setActiveTab('UPDATE_PET_INFO')}>Update Pet-Info</li>
</ul>

          <div className="login-buttons">
            <button>{localStorage.getItem('Name')}</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </header>
      <main>
        {renderContent()}
      </main>
    </>
  );
}

export default Doctorloggedin;
