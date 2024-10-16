const  Register = require("../Model/registerModel.js");

const addLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Register.findOne({ email });

        if (user && user.password === password) {
            // You might want to hash passwords and use bcrypt for security
            return res.json({ success: true });
        }

        res.status(401).json({ success: false, message: 'Invalid email or password' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.addLogin = addLogin;