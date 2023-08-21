const Admin = require("../models/AdminModel");
const Dean = require("../models/DeanModel");
const Staff = require("../models/StaffModel");
const { sendTokenAdmin } = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");
const Department = require("../models/DepartmentModel");
const Request = require("../models/RequestModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");

exports.createDean = async (req, res) => {
  const { name, email, password, departmentId } = req.body;
  const dean = new Dean({
    name,
    email,
    password,
    role: "dean",
    departmentId,
  });
  await dean.save();
  await Department.findByIdAndUpdate(departmentId, {
    $push: { deans: dean._id },
  });
  res.status(201).json(dean);
};

//GET DEAN BY ID
exports.getDeanById = async (req, res) => {
  try {
    const dean = await Dean.findById(req.params.id);
    // .populate('department');
    if (!dean) {
      return res.status(404).json({ message: "Dean not found" });
    }
    res.json(dean);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register user
exports.createAdmin = catchAsyncErrors(async (req, res, next) => {
  // try {
  const { name, email, password, contact } = req.body;

  const admin = await Admin.create({
    name,
    email,
    password,
    contact,
  });

  sendToken(user, 201, res);
  //catch (error) {
});

exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  try {
    let admin = await Dean.findOne({ email }).select("+password");
    if (!admin) {
      admin = await Staff.findOne({ email }).select("+password");
    }
    if (!admin) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }
    const isPasswordMatched = await admin.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }
    console.log(admin);
    sendTokenAdmin(admin, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//logout ADMIN
exports.logoutAdmin = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "log out success",
  });
};
