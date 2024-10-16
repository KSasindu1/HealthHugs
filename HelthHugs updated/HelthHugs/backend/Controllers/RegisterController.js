const Register = require("../Model/registerModel.js");

// Route to add a new registration
const addRegister = async (req, res) => {
    try {
        const newUser = await Register.create(req.body); // Create new user
        res.status(201).json(newUser); // Respond with 201 status and created user data
    } catch (err) {
        res.status(400).json({ message: 'Failed to register user', error: err.message }); // Error handling
    }
};

exports.addRegister = addRegister;