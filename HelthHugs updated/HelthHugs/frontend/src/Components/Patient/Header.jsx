import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';

const Header = () => {
  return (
    <header className="App-header">
      <nav className="navbar">
        <div className="logo">HealthHugs</div>
        <ul className="nav-links">
        {/*<Link to="/home">
            <li>HOME</li>
            </Link>
            <li>SERVICES</li>*/}
            <li>ABOUT US</li>
            <li>CONTACT</li>
            <li>FAQ</li>
            <Link to="/admindashHomelogin"><li>STAFF</li></Link>
        </ul>
        <div className="auth-buttons">
          <Link to="/login"> {/* Provide a valid path here */}
            <button className="register">Register Now</button>
          </Link>
          <Link to="/login">
            <button className="sign-up">Login</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
