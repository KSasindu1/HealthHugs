import React from "react";
import { Link } from 'react-router-dom';
import './LogHome.css';
import Logout from "./Logout";
import Footer from "../Footer";

const LogHome = () => {
    return (
        <div className="App">
          <Logout />
          <main>
            <section className="hero-section">
              <div className="hero-text">
                <h1>Welcome to HealthHugs</h1>
                <h3>Your trusted healthcare platform designed to streamline and enhance patient care. We provide a secure, user-friendly system that connects patients and healthcare providers, making healthcare services more accessible and efficient.</h3>

                <h2>Our Services:</h2>
                <p>Patient Registration: Easily register and securely manage your personal and medical information.</p>
                <p>Medical History Keeping: Keep a complete and up-to-date medical history, accessible to your healthcare providers for better-informed treatment.</p>
                <p>Hospital Admission: Streamline the hospital admission process with online forms and real-time updates on bed availability.</p>
                <p>Dental Care Services: Schedule appointments with specialized dental professionals and manage your dental care records in one place.</p>
                <p>Order Medicine from Pharmacy: Conveniently order prescribed medications from partnered pharmacies with delivery options available.</p>
                <p>Doctor Channeling at Ease: Effortlessly find and book appointments with doctors across various specialties, ensuring timely and accessible care.</p>
                <p>Secure Payment: Make fast and secure payments for medical services, pharmacy orders, and consultations through multiple payment gateways.</p>
                <p>Doctor Portal: A dedicated portal for doctors to manage patient appointments, access medical histories, and issue prescriptions efficiently.</p>
                <p>Your health, our priority – all in one integrated platform designed for modern healthcare.</p>
              </div>
              <div className="hero-images">
                <table border='0'>
                  <tr>
                    <th>
                      <img src="/images/doctor1.jpeg" alt="Doctor 1" className="doctor-img" />
                    </th>
                    <th>
                      <img src="/images/doctor2.jpeg" alt="Doctor 2" className="doctor-img" />
                    </th>
                  </tr>
                  <tr>
                    <th colSpan='2'>
                      <img src="/images/doctor3.jpeg" alt="Doctor 3" className="doctor-img" />
                    </th>
                  </tr>
                </table>               
              </div>
            </section>
            <Footer />
          </main>
        </div>
    );
}

export default LogHome;
