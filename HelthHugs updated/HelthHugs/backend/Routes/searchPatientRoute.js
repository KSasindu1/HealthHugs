const express = require('express');
const router = express.Router();
const SearchPatientController = require("../Controllers/SearchPatientController");


router.get('/', SearchPatientController.searchPatient);

module.exports = router;