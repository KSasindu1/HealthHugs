import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Registered.css';

const Registered = () => {
  return (
    <header className="App-header">
      <nav className="navbar">
        <div className="logo">HealthHugs</div>
        <ul className="nav-links">
          {/*<Link to="/registeredhome">
            <li>HOME</li>
            </Link>
            <li>SERVICES</li>*/}
            <li>ABOUT US</li> 
            <li>CONTACT</li>
            <li>FAQ</li>
            <Link to="/admindashHomelogin"><li>STAFF</li></Link>
        </ul>
        <div className="auth-buttons">
          <Link to="/patients-details"> {/* Provide a valid path here */}
            <button className="register">Create Profile</button>
          </Link>
          <Link to="/">
            <button className="log-out">Logout</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Registered;