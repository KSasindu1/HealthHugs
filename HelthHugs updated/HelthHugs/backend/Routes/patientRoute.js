const express = require('express');
const router = express.Router();
const PatientController = require("../Controllers/PatientController");

// Create a new patient
router.post('/', PatientController.addPatient);

// Route for getting all patients
router.get('/', PatientController.getAllPatient);

// Route for getting a patient by id
router.get('/:id', PatientController.getPatientID);

// Route for updating a patient by id
router.put('/:id', PatientController.updatePatientID);

// Route for deleting a patient by id
router.delete('/:id', PatientController.deletePatientID);

module.exports = router;
