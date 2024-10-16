import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import './MedicalHistoryDetails.css';
import Registered from '../RegisteredHome/Registered';
import Footer from '../Footer';

const MedicalHistoryDetails = () => {
  const [inputUser, setInputUser] = useState({
    NIC: '',
    allergies: '',
    illnesses: '',
    operations: '',
    medications: '',
    conditions: '',
  });

  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate(); // Defined navigate

  // Fetch single user data based on ID
  const fetchSingleUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/patients/${id}`);
      setInputUser(res.data || {}); // Fallback in case data is not structured as expected
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Error fetching user data. Please try again.');
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleUser();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('http://localhost:8081/medicalhistory', inputUser);
      if (res.status === 201) {
        alert('Data inserted successfully');
        fetchAllUser(); // Refresh data after submission

        // Navigate after 2 seconds
        setTimeout(() => {
          navigate("/mainhome");
        }, 2000);  // Wait for 2 seconds before navigating
      } else {
        alert(`Failed to insert data, status code: ${res.status}`);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
      alert(`Failed to insert data: ${error.message}`);
    }
  };

  // Fetch all medical history data
  const fetchAllUser = async () => {
    try {
      const res = await axios.get('http://localhost:8081/medicalhistory');
      setUserData(res.data || []); // Ensure there's a fallback in case no data is returned
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching medical history data. Please try again.');
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  // Handle deletion
  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:8081/medicalhistory/${userId}`);
      if (res.status === 200) {
        alert('Record deleted successfully');
        fetchAllUser(); // Refresh the table after deletion
        
      } else {
        alert('Failed to delete record');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('An error occurred while deleting the record');
    }
  };

  return (
    <div className="body-content">
       <Registered /> 
      <div className="tab-content">
        <div className="tab-buttons">
          <Link to="/search-details"><button className="tab-button">View Personal Details</button></Link>
          <Link to="/patients-details"><button className="tab-button">New Personal Details</button></Link>
          {/*{userData.length > 0 && (
            <Link to={`/medical-history/${userData[userData.length - 1]._id}`}><button className="tab-button">Medical History</button></Link>
          )}*/}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="medical-history-form">
            <div className="left-section">
              <div className="form-group">
                <label>NIC: </label>
                <input
                  type="text"
                  name="NIC"
                  placeholder="NIC"
                  required
                  value={inputUser.NIC}
                  onChange={handleChange}
                />
                <label>1. Please list if you have any drug allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={inputUser.allergies}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>2. Please list if you have other illnesses</label>
                <input
                  type="text"
                  name="illnesses"
                  value={inputUser.illnesses}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>3. Please list any operations and dates of each</label>
                <textarea
                  name="operations"
                  cols="44"
                  rows="4"
                  value={inputUser.operations}
                  onChange={handleChange}
                  className="textarea-box"
                />
              </div>
              <div className="form-group">
                <label>4. Please list your current medications</label>
                <input
                  type="text"
                  name="medications"
                  value={inputUser.medications}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="right-section">
              <label>5. Have you ever had:</label>
              <div className="checkbox-group">
                <ul>
                  <li>Anemia</li>
                  <li>Cancer</li>
                  <li>Heart Disease</li>
                  <li>High Blood Pressure</li>
                  <li>Asthma</li>
                  <li>Diabetes</li>
                  <li>Gallstones</li>
                  <li>Heart Attack</li>
                  <li>Sleep Apnea</li>
                </ul>
              </div>
              <div className="form-group">
                <textarea
                  name="conditions"
                  cols="44"
                  rows="5"
                  value={inputUser.conditions}
                  onChange={handleChange}
                  className="textarea-box"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      <h2 className="leftConer">Your Medical History Details</h2>
      <div className="table-container">
        {userData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th className="table-header">NIC</th>
                <th className="table-header">Allergies</th>
                <th className="table-header">Illnesses</th>
                <th className="table-header">Operations</th>
                <th className="table-header">Medications</th>
                <th className="table-header">Conditions</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 && (
                <tr className="table-body-row" key={userData[userData.length - 1]._id}>
                  <td className="table-cell">{userData[userData.length - 1].NIC}</td>
                  <td className="table-cell">{userData[userData.length - 1].allergies}</td>
                  <td className="table-cell">{userData[userData.length - 1].illnesses}</td>
                  <td className="table-cell">{userData[userData.length - 1].operations}</td>
                  <td className="table-cell">{userData[userData.length - 1].medications}</td>
                  <td className="table-cell">{userData[userData.length - 1].conditions}</td>
                  <td className="table-cell">
                    <div className="actions-container form-buttons">
                      <button onClick={() => handleDelete(userData[userData.length - 1]._id)} className="delete-buttons">Delete</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <p>No medical history data available.</p>
        )}
      </div>
       <Footer /> 
    </div>
  );
};

export default MedicalHistoryDetails;
