const express = require('express');
const router = express.Router();
const MedicalHistoryController = require("../Controllers/MedicalHistoryController");

router.post('/', MedicalHistoryController.addMedicalHistory);
router.get('/', MedicalHistoryController.getMedicalHistory);
router.get('/:id', MedicalHistoryController.getMedicalHistoryID);
router.put('/:id', MedicalHistoryController.updateMedicalHistoryID);
router.delete('/:id', MedicalHistoryController.deleteMedicalHistoryID);

module.exports = router;