import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PatientDetails.css';
//import Header from '../Header';
//import Footer from '../Footer';

const UpdatePatient = () => {

    const [inputUser, setInputUser] = useState({
        NIC: "",
        firstName: "",
        lastName: "",
        email: "",
        DOB: "",
        gender: "",
        address: "",
        contactNo1: "",
        contactNo2: "",
        bloodGrp: ""
      });

    const { id } = useParams();  // Importing and using useParams to get the id from URL
    const navigate = useNavigate();  // Importing useNavigate for navigation

    // Data fetching single
    const fetchSingleUser = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/patients/${id}`);
            console.log(res);
            setInputUser({
                NIC: res.data.NIC,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                DOB: res.data.DOB,
                gender: res.data.gender,
                address: res.data.address,
                contactNo1: res.data.contactNo1,
                contactNo2: res.data.contactNo2,
                bloodGrp: res.data.bloodGrp
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchSingleUser();
    }, [id]);

    const handleChange = (event) => {
        setInputUser({
            ...inputUser,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputUser);

        try {
            const res = await axios.put(`http://localhost:8081/patients/${id}`, inputUser);
            console.log('Response from backend:', res);

            if (res.status === 201 || res.status === 200) {
                window.alert("Data updated successfully");
                //navigate(`/patients/details/${id}`);  // Using navigate to redirect to updated patient details
                navigate("/patients-details");
            } else {
                window.alert("Failed to update data, status code: " + res.status);
            }
        } catch (error) {
            console.error("Error updating data:", error.response?.data || error.message);
            window.alert("Failed to update data: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="body-content">
            {/* <Header /> */}
            <div className="tab-content">
                <div className="form-container">
                    <h2>Update Patient Details</h2><br/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-details">
                            <div className="form-column">
                                <label>NIC : </label>
                                <input 
                                    type="text" 
                                    name="NIC"
                                    placeholder="NIC" 
                                    required 
                                    value={inputUser.NIC}
                                    onChange={handleChange}
                                />
                                <label>First Name : </label>
                                <input 
                                    type="text" 
                                    name="firstName"
                                    placeholder="First Name" 
                                    required 
                                    value={inputUser.firstName}
                                    onChange={handleChange}
                                />

                                <label>Last Name : </label>
                                <input 
                                    type="text" 
                                    name="lastName"
                                    placeholder="Last Name" 
                                    required 
                                    value={inputUser.lastName}
                                    onChange={handleChange}
                                />

                                <label>Email : </label>  
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email" 
                                    required 
                                    value={inputUser.email}
                                    onChange={handleChange}
                                />

                                <label>Address : </label>
                                <input 
                                    type="text" 
                                    name="address"
                                    placeholder="Address" 
                                    required 
                                    value={inputUser.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-column">
                                <label>Phone No 1 : </label>
                                <input 
                                    type="text" 
                                    name="contactNo1"
                                    placeholder="Phone No 1" 
                                    required 
                                    value={inputUser.contactNo1}
                                    onChange={handleChange}
                                />

                                <label>Phone No 2 : </label>
                                <input 
                                    type="text" 
                                    name="contactNo2"
                                    placeholder="Phone No 2" 
                                    value={inputUser.contactNo2}
                                    onChange={handleChange}
                                />

                                {/*<label>Gender : </label>
                                <input 
                                    type="text" 
                                    name="gender"
                                    placeholder="Gender" 
                                    required 
                                    value={inputUser.gender}
                                    onChange={handleChange}
                                />*/}

                                <label>Gender: </label>
                                <select 
                                    name="gender" 
                                    required 
                                    value={inputUser.gender} 
                                    onChange={handleChange}
                                    className="selectOpt">
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    {/*<option value="Other">Other</option>*/}
                                </select>

                                <label>Blood Group : </label>
                                <input 
                                    type="text" 
                                    name="bloodGrp"
                                    placeholder="Blood Group" 
                                    required 
                                    value={inputUser.bloodGrp}
                                    onChange={handleChange}
                                />

                                <label>Date of Birth : </label>
                                <input 
                                    type="text" 
                                    name="DOB"
                                    placeholder="Date of Birth" 
                                    required 
                                    value={inputUser.DOB}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-buttons">
                            <button type="submit">Update</button>
                        </div>            

                    </form>          
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default UpdatePatient;
