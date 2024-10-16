const Patient = require("../Model/patientModel.js");

const searchPatient = async (req, res) => {
    try {
        const { search } = req.query;

        // If search term is empty, return a 400 status with a message
        if (!search) {
            return res.status(400).json({ message: 'Search term is required.' });
        }

        const query = {
            $or: [
                { NIC: { $regex: search, $options: 'i' } }, // Search by NIC
                //{ firstName: { $regex: search, $options: 'i' } }, // Search by first name (uncomment if needed)
                //{ lastName: { $regex: search, $options: 'i' } } // Search by last name (uncomment if needed)
            ]
        };

        const patientData = await Patient.find(query);

        // If no patients found, return a 404 status
        if (patientData.length === 0) {
            return res.status(404).json({ message: 'No patients found.' });
        }

        // Respond with status 200 and the patient data
        res.status(200).json(patientData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.searchPatient = searchPatient;
