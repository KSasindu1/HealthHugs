const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema(
    {
        NIC: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Adding unique constraint to email
        },
        DOB: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        contactNo1: {
            type: Number,
            required: true,
        },
        contactNo2: {
            type: Number,
            required: true, // contactNo2 is not always required
        },
        bloodGrp: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model("Patient", patientSchema);
