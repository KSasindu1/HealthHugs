const MedicalHistory = require("../Model/medicalHistoryModel.js");

// Route to create a new medical history record
const addMedicalHistory = async (req, res) => {
    try {
      const newMedicalHistory = req.body; 
      const medical = new MedicalHistory(newMedicalHistory); // Corrected model usage
      const savedHistory = await medical.save(); // Saving to DB
      res.status(201).json(savedHistory); // Respond with created status
    } catch (error) {
      res.status(400).json({ message: error.message }); // Error handling
    }
};

// GET: Fetch all medical history records
const getMedicalHistory = async (req, res) => {
    try {
        const historyData = await MedicalHistory.find({});
        res.status(200).json(historyData); // Explicitly send 200 OK
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET: Fetch a medical history record by ID
const getMedicalHistoryID = async (req, res) => {
    try {
        const id = req.params.id;
        const history = await MedicalHistory.findById(id); // Use findById for cleaner code
        if (history) {
            res.status(200).json(history); // Explicitly send 200 OK
        } else {
            res.status(404).json({ message: 'Medical history not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// PUT: Update a medical history record by ID
const updateMedicalHistoryID = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedHistory = await MedicalHistory.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedHistory) {
            res.status(200).json(updatedHistory); // Send updated record
        } else {
            res.status(404).json({ message: 'Medical history not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE: Delete a specific medical history record by ID
const deleteMedicalHistoryID = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedHistory = await MedicalHistory.findByIdAndDelete(id); 
        if (deletedHistory) {
            res.status(200).json({ message: 'Medical history record deleted successfully', data: deletedHistory });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

  exports.addMedicalHistory = addMedicalHistory;
  exports.getMedicalHistory = getMedicalHistory;
  exports.getMedicalHistoryID = getMedicalHistoryID;
  exports.updateMedicalHistoryID = updateMedicalHistoryID;
  exports.deleteMedicalHistoryID = deleteMedicalHistoryID;


