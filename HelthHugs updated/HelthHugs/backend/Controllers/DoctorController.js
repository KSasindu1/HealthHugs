const DoctorModel = require("../Model/DoctorModel");

//Display Data
const getAllDetails = async (req, res, next) => {
  let doctor;
  try {
    doctor = await DoctorModel.find();
  } catch (err) {
    console.log(err);
  }
  if (!doctor) {
    return res.status(404).json({ message: "Data not found" });
  }
  return res.status(200).json({ doctor });
};

//Insert Data
const addData = async (req, res, next) => {
  const {
    doctorName,
    doctorID,
    gender,
    gmail,
    clinic,
    timeSlotStart,
    timeSlotEnd,
    price,
    date,
  } = req.body;

  let doctor;

  try {
    doctor = new DoctorModel({
      doctorName,
      doctorID,
      gender,
      gmail,
      clinic,
      timeSlotStart,
      timeSlotEnd,
      date,
      price,
    });
    await doctor.save();
  } catch (err) {
    console.log(err);
  }
  if (!doctor) {
    return res.status(404).json({ message: "unable to add data" });
  }
  return res.status(200).json({ doctor });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let doctor;
  try {
    doctor = await DoctorModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!doctor) {
    return res.status(404).json({ message: "Data Not Found" });
  }
  return res.status(200).json({ doctor });
};

//Update Details
const updateData = async (req, res, next) => {
  const id = req.params.id;
  const {
    doctorName,
    doctorID,
    gender,
    gmail,
    clinic,
    timeSlotStart,
    timeSlotEnd,
    date,
    price,
  } = req.body;

  let doctor;

  try {
    doctor = await DoctorModel.findByIdAndUpdate(id, {
      doctorName: doctorName,
      doctorID: doctorID,
      gender: gender,
      gmail: gmail,
      clinic: clinic,
      timeSlotStart: timeSlotStart,
      timeSlotEnd: timeSlotEnd,
      date: date,
      price: price,
    });
    doctor = await doctor.save();
  } catch (err) {
    console.log(err);
  }
  if (!doctor) {
    return res.status(404).json({ message: "Unable to Update data" });
  }
  return res.status(200).json({ doctor });
};

//Delete data
const deleteData = async (req, res, next) => {
  const id = req.params.id;

  let doctor;

  try {
    doctor = await DoctorModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!doctor) {
    return res.status(404).json({ message: "Unable to Delete Details" });
  }
  return res.status(200).json({ doctor });
};

const checkSession = async (req, res, next) => {
  const { doctorName, date, timeSlotStart, timeSlotEnd } = req.body;

  let existingSession;
  try {
    existingSession = await DoctorModel.findOne({
      doctorName,
      date,
      timeSlotStart,
      timeSlotEnd,
    });
  } catch (err) {
    console.log(err);
  }

  if (existingSession) {
    return res
      .status(200)
      .json({ exists: true, message: "Session already exists" });
  } else {
    return res
      .status(200)
      .json({ exists: false, message: "Session is available" });
  }
};

exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;

exports.checkSession = checkSession;
