import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Ensure Link is imported
import jsPDF from "jspdf";
import 'jspdf-autotable'; // Import the autotable plugin
import './ReadPatient.css'; // Import the CSS file

const ReadUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  const fetchSingleUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/patients/${id}`);
      setUserData(res.data);
    } catch (err) {
      console.error("Error fetching user data", err);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  const generatePDF = async () => {
    try {
        // Create new jsPDF instance
        const doc = new jsPDF();

        // Set document title and styling
        doc.setFontSize(18);
        doc.text("Patient Report", 14, 20);

        // Add the table with patient details
        doc.autoTable({
            startY: 30, // Position of the table
            head: [['Fields', 'Details']],
            body: [
                ['NIC', userData?.NIC || ''],
                ['First Name', userData?.firstName || ''],
                ['Last Name', userData?.lastName || ''],
                ['Email', userData?.email || ''],
                ['DOB', userData?.DOB || ''],
                ['Gender', userData?.gender || ''],
                ['Address', userData?.address || ''],
                ['Phone No 1', userData?.contactNo1 || ''],
                ['Phone No 2', userData?.contactNo2 || ''],
                ['Blood Group', userData?.bloodGrp || ''],
            ],
            styles: { fontSize: 12, cellPadding: 5 }, // Style table
            headStyles: { fillColor: [22, 160, 133] }, // Color for table headers
            alternateRowStyles: { fillColor: [230, 240, 255] }, // Alternate row color
        });

        // Save the PDF
        doc.save('patient_report.pdf');

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('An error occurred while generating the PDF. Please try again.');
    } finally {
        // Remove loading indicator
        document.body.removeChild(loadingIndicator);
    }
};


  return (
    <div className="container">
      <div className="table-container">
        <table className="table" border='1'>
          <thead>
            <tr>
              <th className="th1">Fields</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>NIC</th>
              <td>{userData?.NIC}</td>
            </tr>
            <tr>
              <th>First Name</th>
              <td>{userData?.firstName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{userData?.lastName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{userData?.email}</td>
            </tr>
            <tr>
              <th>DOB</th>
              <td>{userData?.DOB}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{userData?.gender}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{userData?.address}</td>
            </tr>
            <tr>
              <th>Phone No 1</th>
              <td>{userData?.contactNo1}</td>
            </tr>
            <tr>
              <th>Phone No 2</th>
              <td>{userData?.contactNo2}</td>
            </tr>
            <tr>
              <th>Blood Group</th>
              <td>{userData?.bloodGrp}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="generate-report-btn" onClick={generatePDF}>
        Generate Report
      </button>

      {/* Medical History Link */}
      <Link to={`/updatemedical-history/${userData?._id}`}>
        <button className="update-button">Update Medical History</button>
      </Link>
    </div>
  );
};

export default ReadUser;
