const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registerSchema = new Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Adding unique constraint to email
        },
        password: {
            type: String,
            required: true,
        },
    }
);

module.exports = mongoose.model("Register", registerSchema);
