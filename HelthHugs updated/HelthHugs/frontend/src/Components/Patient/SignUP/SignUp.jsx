import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
// Uncomment the Footer import if you're using it
// import Footer from "../Footer";

const SignUp = () => {
  const [inputUser, setInputUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  });
    
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputUser);

    // Check if password exceeds maximum length of 6 characters
    if (inputUser.password.length > 6) {
      setError('Password must be at most 6 characters.');
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/register", inputUser);

      if (res.status === 201 || res.status === 200) {
        alert("Data inserted successfully");
        navigate('/login');
      } else {
        alert(`Failed to insert data, status code: ${res.status}`);
      }
    } catch (error) {
      console.error("Error inserting data:", error.response?.data || error.message);
      setError(`Failed to insert data: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="body-content">
      <div className="sign-up-page">
        <div className="sign-up-container">
          <div className="sign-up-image">
            <img src="/images/Image2.png" alt="Sign Up" />
          </div>
          <div className="sign-up-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td colSpan="2"><label>First Name: </label></td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input
                        type="text"
                        name="fname"
                        placeholder="First Name"
                        required 
                        value={inputUser.fname}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2"><label>Last Name: </label></td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input
                        type="text"
                        name="lname"
                        placeholder="Last Name"
                        required 
                        value={inputUser.lname}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2"><label>Email: </label></td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required 
                        value={inputUser.email}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2"><label>Password: </label></td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        required 
                        value={inputUser.password}
                        onChange={handleChange}
                        className="password-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                      />
                    </td>
                    <td><label className="password-checkbox">Show Password</label></td>
                  </tr>
                </tbody>
              </table>  
              {error && <div className="error-message">{error}</div>} 
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      {/* Uncomment or remove based on your needs */}
      {/* <Footer /> */}
    </div>
  );
}

export default SignUp;
