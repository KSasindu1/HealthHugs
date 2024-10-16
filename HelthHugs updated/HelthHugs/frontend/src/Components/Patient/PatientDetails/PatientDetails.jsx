import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './PatientDetails.css';
import Registered from '../RegisteredHome/Registered';
import Footer from '../Footer';

const PatientDetails = () => {
  const location = useLocation();
  const initialEmail = location.state?.email || ''; // Get email passed from Login page
  const [inputUser, setInputUser] = useState({
      NIC: "",
      firstName: "",
      lastName: "",
      email: initialEmail, // Use email from login
      DOB: "",
      gender: "",
      address: "",
      contactNo1: "",
      contactNo2: "",
      bloodGrp: ""
  });

  const handleChange = (event) => {
      setInputUser({
          ...inputUser,
          [event.target.name]: event.target.value,
      });
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const res = await axios.post("http://localhost:8081/patients", inputUser);
          if (res.status === 201) {
              alert("Data inserted successfully");
          } else {
              alert(`Failed to insert data, status code: ${res.status}`);
          }
      } catch (error) {
          console.error("Error inserting data:", error.response?.data || error.message);
          alert(`Failed to insert data: ${error.response?.data?.message || error.message}`);
      }
  };

  // Data fetching (all)
  const [userData, setUserData] = useState([]);
  
  const fetchAllUser = async () => {
      try {
          const res = await axios.get("http://localhost:8081/patients");
          setUserData(res.data);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  useEffect(() => {
      fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
      try {
          const res = await axios.delete(`http://localhost:8081/patients/${id}`);
          if (res.status === 200) {
              fetchAllUser();
          }
      } catch (error) {
          console.error("Error deleting data:", error);
      }
  };

  // Profile section
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, (maxSize - img.width) / 2, (maxSize - img.height) / 2);
        canvas.toBlob((blob) => {
          const newFile = new File([blob], file.name, { type: "image/jpeg", lastModified: Date.now() });
          setImage(newFile);
          setImageURL(URL.createObjectURL(newFile));
        }, "image/jpeg", 0.8);
      };
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleUploadButtonClick = () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    fetch("https://trickuweb.com/upload/profile_pic", {
      method: "POST",
      headers: { "Authorization": "Bearer adhgsdaksdhk938742937423" },
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        setImageURL(result.img_url);
      })
      .catch(error => console.log("error", error));
  };

  const handleClick = () => hiddenFileInput.current.click();

  return (
      <div className="body-content">

          < Registered />

          <div className="tab-content">
              <div className="tab-buttons">
                  <Link to="/search-details"><button className="tab-button">View Personal Details</button></Link>
                  <Link to="/patients-details"><button className="tab-button">New Personal Details</button></Link>
                  {/*{userData.length > 0 && (
                  <Link to={`/medical-history/${userData[userData.length - 1]._id}`}><button className="tab-button">Medical History</button></Link> )} */}
              </div>

              <div className="profile-section">
                <div className="box-decoration">
                  <div onClick={handleClick} style={{ cursor: "pointer" }}>
                    {imageURL ? (
                      <img src={imageURL} alt="Upload preview" className="img-display" />
                    ) : (
                      <img src="/images/Frame2.png" alt="Upload image" className="img-display" />
                    )}
                    <input
                      id="image-upload-input"
                      type="file"
                      onChange={handleImageChange}
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                    />
                  </div>
                  <button className="image-upload-button" onClick={handleUploadButtonClick}>
                    Upload
                  </button>
                </div>
              </div>

              <div className="form-container">
                  <form onSubmit={handleSubmit}>
                      <div className="form-details">
                          <div className="form-column">
                              <label>NIC: </label>
                              <input 
                                  type="text" 
                                  name="NIC"
                                  placeholder="NIC"
                                  required 
                                  value={inputUser.NIC}
                                  onChange={handleChange}
                              />
                              <label>First Name: </label>
                              <input 
                                  type="text" 
                                  name="firstName"
                                  placeholder="First Name" 
                                  required 
                                  value={inputUser.firstName}
                                  onChange={handleChange}
                              />
                              <label>Last Name: </label>
                              <input 
                                  type="text" 
                                  name="lastName"
                                  placeholder="Last Name" 
                                  required 
                                  value={inputUser.lastName}
                                  onChange={handleChange}
                              />
                              <label>Email: </label>  
                              <input 
                                  type="email" 
                                  name="email"
                                  placeholder="Email" 
                                  required 
                                  value={inputUser.email}
                                  onChange={handleChange}
                              />
                              <label>Address: </label>
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
                              <label>Phone No 1: </label>
                              <input 
                                  type="text" 
                                  name="contactNo1"
                                  placeholder="Phone No 1" 
                                  required 
                                  value={inputUser.contactNo1}
                                  onChange={handleChange}
                              />
                              <label>Phone No 2: </label>
                              <input 
                                  type="text" 
                                  name="contactNo2"
                                  placeholder="Phone No 2"
                                  value={inputUser.contactNo2}
                                  onChange={handleChange}
                              />
                              {/*<label>Gender: </label>
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
                              <label>Blood Group: </label>
                              <input 
                                  type="text" 
                                  name="bloodGrp"
                                  placeholder="Blood Group" 
                                  required 
                                  value={inputUser.bloodGrp}
                                  onChange={handleChange}
                              />
                              <label>Date of Birth: </label>
                              <input 
                                  type="date" 
                                  name="DOB"
                                  placeholder="Date of Birth" 
                                  required 
                                  value={inputUser.DOB}
                                  onChange={handleChange}
                              />
                          </div>
                      </div>
                      <div className="form-buttons">
                          <button type="submit">Create</button>
                      </div>
                  </form>
              </div>
          </div>

          <h2 className="leftConer">Your Details</h2><br/>
          <div className="table-container">
            <table className="table" border="1">
              <thead className="table-header">
                <tr>
                  <th className="table-header">NIC</th>
                  <th className="table-header">First Name</th>
                  <th className="table-header">Last Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              {/*<tbody>
                {userData.length > 0 && (
                  <tr className="table-body-row">
                    <td className="table-cell">{userData[0].firstName}</td>
                    <td className="table-cell">{userData[0].lastName}</td>
                    <td className="table-cell">{userData[0].email}</td>
                    <td className="table-cell">
                      <div className="actions-container form-buttons">
                        <Link to={`/readpatient/${userData[0]._id}`}><button>Read</button></Link>
                        <Link to={`/updatepatient/${userData[0]._id}`}><button>Edit</button></Link>
                        <button onClick={() => handleDelete(userData[0]._id)} className="link-delete">Delete</button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>*/}

              <tbody>
                {userData.length > 0 && (
                  <tr className="table-body-row">
                    <td className="table-cell">{userData[userData.length - 1].NIC}</td>
                    <td className="table-cell">{userData[userData.length - 1].firstName}</td>
                    <td className="table-cell">{userData[userData.length - 1].lastName}</td>
                    <td className="table-cell">{userData[userData.length - 1].email}</td>
                    <td className="table-cell">
                      <div className="actions-container form-buttons">
                        <Link to={`/readpatient/${userData[userData.length - 1]._id}`}>
                          <button className="read-buttons">Read</button>
                        </Link>
                        <Link to={`/updatepatient/${userData[userData.length - 1]._id}`}>
                          <button className="edit-buttons">Edit</button>
                        </Link>
                        {/*<button
                          onClick={() => handleDelete(userData[userData.length - 1]._id)}
                          className="link-delete"
                        >
                          Delete
                        </button>*/}
                        <Link to={`/medical-history/${userData[userData.length - 1]._id}`}><button className="tab-button">Medical History</button></Link>
                      </div>
                    </td>
                  </tr>

                  
                )}
              </tbody>
            </table>
          </div>

           <Footer />

      </div>
  );
};

export default PatientDetails;