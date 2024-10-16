import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './MedicalHistoryDetails.css';
import Registered from '../RegisteredHome/Registered';
import Footer from '../Footer';

const UpdateMedicalHistoryDetails = () => {
  const [inputUser, setInputUser] = useState({
    NIC: '',
    allergies: '',
    illnesses: '',
    operations: '',
    medications: '',
    conditions: '',
  });

  const [updatedUser, setUpdatedUser] = useState(null);  // State to hold updated user data
  const [showUpdatedData, setShowUpdatedData] = useState(false); // State to control display of updated data
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch single user data based on ID
  const fetchSingleUser = async () => {
    try {
      const patientRes = await axios.get(`http://localhost:8081/patients/${id}`);
      setInputUser((prevState) => ({
        ...prevState,
        NIC: patientRes.data.NIC,
      }));
  
      const medicalHistoryRes = await axios.get(`http://localhost:8081/medicalhistory/${id}`);
      
      if (medicalHistoryRes.data && Object.keys(medicalHistoryRes.data).length > 0) {
        setInputUser((prevState) => ({
          ...prevState,
          allergies: medicalHistoryRes.data.allergies || '',
          illnesses: medicalHistoryRes.data.illnesses || '',
          operations: medicalHistoryRes.data.operations || '',
          medications: medicalHistoryRes.data.medications || '',
          conditions: medicalHistoryRes.data.conditions || '',
        }));
      } else {
        alert('No medical history data found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      //alert('Error fetching user data. Please try again.');
      alert('No medical history data found.');

      // Navigate after 0.5 seconds
      setTimeout(() => {
        navigate("/mainhome");
      }, 500);  // Wait for 0.5 seconds before navigating
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleUser();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8081/medicalhistory/${id}`, inputUser);
      if (res.status === 200 || res.status === 201) {
        alert('Data updated successfully');
        setUpdatedUser({ ...inputUser, _id: id });  // Set updated user data
        setShowUpdatedData(true);  // Show updated data

        // Navigate after 2 seconds
        setTimeout(() => {
          navigate("/mainhome");
        }, 2000);  // Wait for 2 seconds before navigating
      } else {
        alert('Failed to update data, status code: ' + res.status);
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert(`Failed to update data: ${error.message}`);
    }
  };

  return (
    <div className="body-content">
       <Registered /> 
      <div className="tab-content">
        <div className="tab-buttons">
          <Link to="/search-details">
            <button className="tab-button">View Personal Details</button>
          </Link>
          <Link to="/patients-details">
            <button className="tab-button">New Personal Details</button>
          </Link>
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

          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>

      <h2 className="leftConer">Updated Medical History Details</h2>
      {showUpdatedData && updatedUser ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="table-header">NIC</th>
                <th className="table-header">Allergies</th>
                <th className="table-header">Illnesses</th>
                <th className="table-header">Operations</th>
                <th className="table-header">Medications</th>
                <th className="table-header">Conditions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-body-row">
                <td className="table-cell">{updatedUser.NIC}</td>
                <td className="table-cell">{updatedUser.allergies}</td>
                <td className="table-cell">{updatedUser.illnesses}</td>
                <td className="table-cell">{updatedUser.operations}</td>
                <td className="table-cell">{updatedUser.medications}</td>
                <td className="table-cell">{updatedUser.conditions}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No updated data yet.</p>
      )}
       <Footer /> 
    </div>
  );
};

export default UpdateMedicalHistoryDetails;