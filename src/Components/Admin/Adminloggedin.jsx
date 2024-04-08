import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Adminloggedin.css'

function Adminloggedin() {
  const api= process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('GENERATE_DOCTOR_ID'); // Default active tab

  // Content functions for each tab
  const HomeContent = () => (
    <div>
      <h2>Home</h2>
      <p>Welcome to the admin dashboard!</p>
    </div>
  );

  const GenerateDoctorIdForm = () => {
    const [doctorId, setDoctorId] = useState('');
    const [email, setEmail] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${api}/users/generate-doctor-id`, { doctorId, email });

        // console.log(response.data.message);
        alert(response.data.message);

        // Clear input fields after successful submission
      setDoctorId('');
      setEmail('');

        // Handle success (e.g., showing a success message)
      } catch (error) {
        const data= JSON.stringify(error.response.data);
        alert(data);
        // console.error('Error submitting form:', error.response?.data.message || 'An error occurred');
        // Handle error (e.g., showing an error message)
      }
    };
  
    return (
        <div className="form-container">
        <h2>Generate Doctor ID</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="doctorId">Doctor ID:</label>
            <input
              id="doctorId"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  

  const MonitorUsersContent = () => {
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/users`);
          setUsers(response.data);
        } catch (err) {
          console.error('Error fetching users:', err);
          setError('Failed to fetch users');
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div className="monitor-users-container">
        <h2 className="monitor-users-title">Monitor Users</h2>
        <table className="monitor-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone / Doctor ID</th>
              <th>City / Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === 'PetParent' ? user.phone : user.doctorId}
                </td>
                <td>
                  {user.role === 'PetParent' ? user.city : user.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  
  const ManageUsersContent = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // User selected for editing
    const [editFormData, setEditFormData] = useState({}); // Form data for editing user
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/users`);
          setUsers(response.data);
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    const handleEdit = (user) => {
      setSelectedUser(user);
      setEditFormData(user);
    };
  
    const handleDelete = async (userId) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/users/users/${userId}`);
          setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
          console.error('Failed to delete user:', error);
        }
      }
    };
  
    const handleFormChange = (event) => {
      const { name, value } = event.target;
      setEditFormData({ ...editFormData, [name]: value });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/users/users/${selectedUser._id}`, editFormData);
        // Ideally, refetch the users list here or manually update the UI
        const updatedUsers = users.map(user => 
          user._id === selectedUser._id ? { ...user, ...editFormData } : user
        );
        alert("Updated User details Succesfully")
        setUsers(updatedUsers);
        setSelectedUser(null); // Reset selectedUser to null after updating
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    };
  
    return (
      <div className="manage-users-container">
  <h2 className="manage-users-title">Manage Users</h2>
  <table className="manage-users-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <button className="action-btn edit-btn" onClick={() => handleEdit(user)}>Edit</button>
            <button className="action-btn delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {selectedUser && (
    <form onSubmit={handleFormSubmit} className="edit-form">
      <input
        className="edit-input"
        name="username"
        value={editFormData.username || ''}
        onChange={handleFormChange}
        placeholder="Username"
      />
      <input
        className="edit-input"
        name="email"
        type="email"
        value={editFormData.email || ''}
        onChange={handleFormChange}
        placeholder="Email"
      />
      <input
        className="edit-input"
        name="role"
        value={editFormData.role || ''}
        onChange={handleFormChange}
        placeholder="Role"
      />
      {/* Add more input fields as needed */}
      <div className="form-actions">
        <button className="save-btn" type="submit">Update details</button>
        <button className="cancel-btn" type="button" onClick={() => setSelectedUser(null)}>Cancel</button>
      </div>
    </form>
  )}
</div>

    );
  };
  

  const GenerateReportsContent = () => (
    <div>
      <h2>Generate Reports</h2>
      {/* Report generation functionality */}
    </div>
  );

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
      case 'GENERATE_DOCTOR_ID':
        return <GenerateDoctorIdForm />;
      case 'MANAGE_USERS':
        return <ManageUsersContent />;
      case 'MONITOR_USERS':
        return <MonitorUsersContent />;
      case 'GENERATE_REPORTS':
        return <GenerateReportsContent />;
      default:
        return <HomeContent />; // Default to Home content
    }
  };

  return (
    <>
      <header className="petcare-header">
        <nav className="petcare-nav">
          <ul className="nav-list">
            <img className='petlogo' src="images/Admin.png" alt="Petcare Logo" />
            <li className="nav-item" >HOME</li>
            <li className="nav-item" onClick={() => setActiveTab('GENERATE_DOCTOR_ID')}>Generate DoctorId</li>
            <li className="nav-item" onClick={() => setActiveTab('MANAGE_USERS')}>Manage Users</li>
            <li className="nav-item" onClick={() => setActiveTab('MONITOR_USERS')}>Monitor Users</li>
            <li className="nav-item" onClick={() => setActiveTab('GENERATE_REPORTS')}>Generate Reports</li>
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

export default Adminloggedin;
