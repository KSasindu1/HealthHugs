import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./DentalUser.css";
import DentalNav from "../Home/DentalNav";
function AddAppointment() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullname: "",
    appointmentID: "",
    phone: "",
    email: "",
    service: "",
    clinic: "",
    doctor: "",
    date: "",
    timeSlotStart: "",
    timeSlotEnd: "",
    doctorID: "",
    price: "",
  });
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const generateAppointmentID = () => {
    const prefix = "AP";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };

  useEffect(() => {
    // Fetch clinics and doctors on component mount
    const fetchClinicsAndDoctors = async () => {
      try {
        const clinicResponse = await axios.get("http://localhost:8081/clinic");
        setClinics(clinicResponse.data.clinic);

        const doctorResponse = await axios.get("http://localhost:8081/doctor");
        setDoctors(doctorResponse.data.doctor);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchClinicsAndDoctors();
    setInputs((prevInputs) => ({
      ...prevInputs,
      appointmentID: generateAppointmentID(),
    }));
  }, []);

  useEffect(() => {
    // Filter doctors based on selected clinic
    if (inputs.clinic) {
      const filtered = doctors.filter(
        (doctor) => doctor.clinic === inputs.clinic
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [inputs.clinic, doctors]);

  useEffect(() => {
    // Update time slots based on selected doctor
    if (inputs.doctor) {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.doctorName === inputs.doctor
      );
      if (selectedDoctor) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          timeSlotStart: selectedDoctor.timeSlotStart,
          timeSlotEnd: selectedDoctor.timeSlotEnd,
          date: selectedDoctor.date,
          doctorID: selectedDoctor.doctorID,
          price: selectedDoctor.price,
        }));
      }
    }
  }, [inputs.doctor, doctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return; // Prevent form submission
    }
    const lettersOnly = /^[A-Za-z\s]*$/; // Regular expression to allow only letters and spaces
    if (!lettersOnly.test(inputs.fullname)) {
      alert("Full name can only contain letters and spaces.");
      return; // Prevent form submission if invalid
    }
    console.log(inputs);
    await sendRequest();
    window.alert("Appointment Added successfully!");
    navigate("/appointmentsummary", { state: { appointmentData: inputs } });
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8081/appointment", {
      fullname: inputs.fullname,
      appointmentID: inputs.appointmentID,
      phone: inputs.phone,
      email: inputs.email,
      service: inputs.service,
      clinic: inputs.clinic,
      doctor: inputs.doctor,
      date: inputs.date,
      timeSlotStart: inputs.timeSlotStart,
      timeSlotEnd: inputs.timeSlotEnd,
      doctorID: inputs.doctorID,
      price: inputs.price,
    });
  };

  return (
    <div>
      <div className="dental_from_background">
        <DentalNav />
        <div className="form_full_dental">
          <div className="appointment_from_full">
            <h1 className="form_head_dental">Schedule your Appointment </h1>
            <p className="from_para_dental">
              Get your Dental Health back on track with us
            </p>
            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="input_group">
                <div className="form-group">
                  <label className="form-label" htmlFor="fullname">
                    Full Name:
                  </label>
                  <br />
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    className="form-input"
                    value={inputs.fullname}
                    onChange={(e) => {
                      const re = /^[A-Za-z\s]*$/;
                      if (re.test(e.target.value)) {
                        handleChange(e);
                      }
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="appointmentID">
                    Appointment ID:
                  </label>
                  <br />
                  <input
                    type="text"
                    id="appointmentID"
                    name="appointmentID"
                    className="form-input"
                    value={inputs.appointmentID}
                    readOnly
                    required
                  />
                </div>
              </div>
              <div className="input_group">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone:
                  </label>
                  <br />
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={inputs.phone}
                    onChange={(e) => {
                      const re = /^[0-9\b]{0,10}$/;
                      if (re.test(e.target.value)) {
                        handleChange(e);
                      }
                    }}
                    maxLength="10"
                    pattern="[0-9]{10}"
                    title="Please enter exactly 10 digits."
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email:
                  </label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={inputs.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="service">
                  Service:
                </label>
                <br />
                <select
                  id="service"
                  name="service"
                  className="form_input_service"
                  value={inputs.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Service</option>
                  <option value="Routing check-ups and Cleaning">
                    Routing check-ups and Cleaning
                  </option>
                  <option value="Teeth Whitening">Teeth Whitening</option>
                  <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                  <option value="Braces">Braces</option>
                  <option value="Root Canal Therapy">Root Canal Therapy</option>
                  <option value="Wisdom Teeth Removal">
                    Wisdom Teeth Removal
                  </option>
                </select>
              </div>
              <div className="input_group">
                <div className="form-group">
                  <label className="form-label" htmlFor="clinic">
                    Clinic:
                  </label>
                  <br />
                  <select
                    id="clinic"
                    name="clinic"
                    className="form-input"
                    value={inputs.clinic}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Clinic</option>
                    {clinics.map((clinic) => (
                      <option key={clinic._id} value={clinic.clinicname}>
                        {clinic.clinicname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="doctor">
                    Doctor:
                  </label>
                  <br />
                  <select
                    id="doctor"
                    name="doctor"
                    className="form-input"
                    value={inputs.doctor}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Doctor</option>
                    {filteredDoctors.length > 0 ? (
                      filteredDoctors.map((doctor) => (
                        <option key={doctor._id} value={doctor.doctorName}>
                          {doctor.doctorName}
                        </option>
                      ))
                    ) : (
                      <option value="">
                        No doctors available for selected clinic
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div className="input_group">
                <div className="form-group">
                  <label className="form-label" htmlFor="date">
                    Date:
                  </label>
                  <br />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-input"
                    value={inputs.date}
                    onChange={handleChange}
                    readOnly
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="timeSlotStart">
                    Your Time Slot:
                  </label>
                  <div className="input_group">
                    <input
                      type="time"
                      id="timeSlotStart"
                      name="timeSlotStart"
                      className="forminput"
                      value={inputs.timeSlotStart}
                      onChange={handleChange}
                      readOnly
                      required
                    />
                    <span className="sub_date_titel">To</span>
                    <input
                      type="time"
                      id="timeSlotEnd"
                      name="timeSlotEnd"
                      className="forminput"
                      value={inputs.timeSlotEnd}
                      onChange={handleChange}
                      readOnly
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="appointmentID">
                  Charges (Rs.):
                </label>
                <br />
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form_input_service"
                  value={inputs.price}
                  onChange={handleChange}
                  readOnly
                  required
                />
              </div>
              <button type="submit" className="submit_btn">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAppointment;
