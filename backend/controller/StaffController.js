const ErrorHandler = require("../utils/ErrorHandler");
// const Question = require("../model/questionModel");
const Request = require("../models/RequestModel");
//const User = require("../model/user");
//const Test = require("../model/Test");
//const Course = require("../model/CourseModel");
const Dean = require("../models/DeanModel");
//change all question into request form
exports.createRequest = async (req, res) => {
  const {
    fullName,
    department,
    phone,
    maintenanceType,
    blockName,
    officeNumber,
    description,
    deanId,
  } = req.body;
  const addedBy = req.user._id; // Assuming the authenticated user is a staff, we can get their ID from the request object

  try {
    const Request = new Request({
      fullName,
      department,
      phone,
      maintenanceType,
      blockName,
      officeNumber,
      description,
      deanId,
      addedBy,
    });
    //i am not sure i try to push the request to the dean
    await Request.save();
    const dean = await Dean.findById(deanId);
    course.request.push(request._id);
    await dean.save();
    res.status(201).json({
      success: true,
      message: "requested successfully",
      data: Request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating Request",
    });
  }
};

// // logout staff

exports.logoutStaff = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "log out success",
  });
};

// exports.getAllQuestion = async (req, res) => {
//   try {
//     const questions = await Question.find({ testid: req.params.id });

//     if (!questions || questions.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Questions not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       questions,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Error finding questions",
//     });
//   }
// };
