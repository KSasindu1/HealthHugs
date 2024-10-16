import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure to import Link
import './SearchPatient.css';
import Registered from '../RegisteredHome/Registered';
import Footer from '../Footer';

const SearchPatient = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm) {
            setError('Please enter a NIC or name to search.');
            setPatients([]);
            setSearched(false);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get("http://localhost:8081/search", {
                params: { search: searchTerm },
            });
            setPatients(response.data);
            setSearched(true);
        } catch (err) {
            setError(err.response?.status === 404 ? 'No patients found.' : 'Failed to fetch patient data.');
            console.error(err);
            setSearched(true);
        } finally {
            setLoading(false);
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
                    <Link to={`/medical-history/${userData[userData.length - 1]._id}`}><button className="tab-button">Medical History</button></Link> )}*/}
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        /*placeholder="Enter NIC or Name (First Last)"*/
                        placeholder="Enter NIC"
                        value={searchTerm}
                        className="search-box"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch} disabled={loading} className="search-button">
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>            

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <h2 className="leftConer">Search Patients</h2>

            <div className='full-box'>
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
                        <tbody>
                            {searched && (
                                patients.length > 0 ? (
                                    <>
                                        <tr>
                                            <td colSpan="5">{patients.length} patient(s) found.</td>
                                        </tr>
                                        {patients.map((patient) => (
                                            <tr key={patient._id} className="table-body-row">
                                                <td className="table-cell">{patient.NIC}</td>
                                                <td className="table-cell">{patient.firstName}</td>
                                                <td className="table-cell">{patient.lastName}</td>
                                                <td className="table-cell">{patient.email}</td>
                                                <td className="table-cell">
                                                    <div className="actions-container form-buttons">
                                                        <Link to={`/readpatient/${patient._id}`}>
                                                            <button className="read-buttons">Read</button>
                                                        </Link>
                                                        <Link to={`/updatepatient/${patient._id}`}>
                                                            <button className="edit-buttons">Edit</button>
                                                        </Link>
                                                        {/* Uncomment if delete functionality is needed */}
                                                        {/* <button onClick={() => handleDelete(patient._id)} className="link-delete">Delete</button> */}
                                                        <Link to={`/updatemedical-history/${patient._id}`}>
                                                            <button className="tab-button">Update Medical History</button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan="5">No patients found.</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

             <Footer /> 
        </div>
    );
};

export default SearchPatient;
