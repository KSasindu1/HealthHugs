const Patient = require("../Model/patientModel.js");

// Create a new patient
const addPatient = async (req, res) => {
    try {
        const bodyData = req.body;
        const user = new Patient(bodyData);
        const patientData = await user.save();
        res.status(201).send(patientData); // Status code 201 for created resource
    } catch (error) {
        res.status(400).send({ message: 'Failed to insert data', error: error.message });
    }
};

// Route for getting all patients
const getAllPatient = async (req, res) => {
    try {
        const patientData = await Patient.find({});
        res.status(200).send(patientData); // Explicitly send 200 OK for successful retrieval
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

// Route for getting a patient by ID
const getPatientID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Patient.findById(id); // Use findById for cleaner syntax
        if (user) {
            res.status(200).send(user); // Explicitly send 200 OK if found
        } else {
            res.status(404).send({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

// Route for updating a patient by ID
const updatePatientID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Patient.findByIdAndUpdate(id, req.body, { new: true }); // Use findByIdAndUpdate
        if (user) {
            res.status(200).send(user); // Explicitly send 200 OK
        } else {
            res.status(404).send({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

// Route for deleting a patient by ID
const deletePatientID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Patient.findByIdAndDelete(id); // Use findByIdAndDelete
        if (user) {
            res.status(200).send({ message: 'Patient deleted successfully' }); // Explicitly send 200 OK
        } else {
            res.status(404).send({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

exports.addPatient = addPatient;
exports.getAllPatient = getAllPatient;
exports.getPatientID = getPatientID;
exports.updatePatientID = updatePatientID;
exports.deletePatientID = deletePatientID;
