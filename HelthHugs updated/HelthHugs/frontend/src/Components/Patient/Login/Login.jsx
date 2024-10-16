import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Check if password exceeds maximum length of 6 characters
        if (password.length > 6) {
            setError('Password must be at most 6 characters long.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/login', { email, password });

            if (response.data.success) {
                // Pass the email as state when navigating to PatientDetails
                navigate('/patients-details', { state: { email } });
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="body-content">
            <div className="login-page">
                <div className="login-container">
                    <div className="login-image">
                        <img src="/images/Image1.png" alt="Healthcare Reception" />
                    </div>
                    <div className="login-form">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan="2"><label>Email: </label></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
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
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
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
                            <button type="submit">Sign In</button>
                        </form>
                        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
