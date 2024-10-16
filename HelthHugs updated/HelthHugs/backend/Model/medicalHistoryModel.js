const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const medicalHistorySchema = new Schema(
    {
          NIC: {
            type: String,
            required: true,
          },
          allergies: {
            type: String,
            required: true,
          },
          illnesses: {
            type: String,
            required: true,
          },
          operations: {
            type: String,
            required: true,
          },
          medications: {
            type: String,
            required: true
          },
          conditions: {
            type: String,
            required: true
          },
         
        });

module.exports = mongoose.model("medicalHistory", medicalHistorySchema);
