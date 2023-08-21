const Request = require("../models/RequestModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const User = require("../models/UserModel");
const json2csv = require('json2csv').parse
const fs = require('fs');
const Department = require("../models/DepartmentModel");
const ObjectId = require('mongodb').ObjectId; 

exports.createRequest = catchAsyncErrors(async (req, res, next) => {
  // try {
  const user = await User.findById(req.user.id);
  const department = await Department.findById(user.departmentId)
  const {
    phone,
    maintenanceType,
    blockName,
    officeNumber,
    description,
  } = req.body;

  const request = await Request.create({
    phone,
	user,
    department,
    maintenanceType,
    blockName,
    officeNumber,
    description,
    status: 'Submitted'
  });

  res.status(201).json({
    success: true,
    request,
  });
});

exports.getAllRequests = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (user.role == 'Dean'){
		req.body['department'] = new ObjectId(user.departmentId)
	}
	if (user.role == 'Staff'){
		req.body['user'] = user._id
	}
	const requests = await Request.aggregate([{$lookup: {from:"users", localField: "assignedMaintenance", foreignField: "_id", as: "assigned_user"},}, {$lookup: {from:"departments", localField: "department", foreignField: "_id", as: "depart"},}, {$match: req.body}]);

	res.status(200).json({
		success: true,
		requests,
	});
});

exports.updateRequest = catchAsyncErrors(async (req, res, next) => {
	const newRequestData = {
		...req.body.request,
	};

  const value = await Request.findById(req.params.id)
  if (value.status != 'Submitted'){
    return res.status(400).json({ message: "You can not update already approved request" });
  }

	const request = await Request.findByIdAndUpdate(
		req.params.id,
		newRequestData,
		{
			new: true,
			runValidator: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
	});
});

exports.approveRequest = catchAsyncErrors(async (req, res, next) => {

  const value = await Request.findById(req.params.id)
  if (value.status != 'Submitted'){
    return res.status(400).json({ message: "You can not update already updated request" });
  }

	const request = await Request.findByIdAndUpdate(
		req.params.id,
		{status: req.body.request.status},
		{
			new: true,
			runValidator: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
	});
});

exports.assignRequest = catchAsyncErrors(async (req, res, next) => {

  const value = await Request.findById(req.params.id)
  if (value.status != 'Accepted'){
    return res.status(400).json({ message: "You can not only assign accepted request" });
  }

	const request = await Request.findByIdAndUpdate(
		req.params.id,
		{assignedMaintenance: req.body.request.user, status: 'Assigned'},
		{
			new: true,
			runValidator: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
	});
});

exports.report = catchAsyncErrors(async (req, res, next) => {

	const requests = await Request.aggregate([{$lookup: {from:"users", localField: "assignedMaintenance", foreignField: "_id", as: "user"},}, {$lookup: {from:"departments", localField: "department", foreignField: "_id", as: "depart"},}]);
	const fields = ['maintenanceType', 'phone', 'blockName', 'officeNumber', 'status', 'description', 'response', 'user[0].name', 'depart[0].departmentName', 'requestedAt']
	const data = json2csv(requests, {fields} )
	//   const request = await Request.findByIdAndUpdate(
	// 	  req.params.id,
	// 	  {assignedMaintenance: req.body.request.user, status: 'Assigned'},
	// 	  {
	// 		  new: true,
	// 		  runValidator: true,
	// 		  useFindAndModify: false,
	// 	  }
	//   );
	fs.writeFile(__dirname + '/report.csv', data, (sudd, err) => {
		if (err) throw err
		else {
			res.sendFile('report.csv', {root: __dirname})
		}
	}, )
  });


exports.responseRequest = catchAsyncErrors(async (req, res, next) => {

  const value = await Request.findById(req.params.id)
  
  if (value.assignedMaintenance._id.toString() != req.user.id){
    return res.status(400).json({ message: "You are not assigned maintainer" });
  }

	const request = await Request.findByIdAndUpdate(
		req.params.id,
		{response: req.body.request.response, status: 'Responsed'},
		{
			new: true,
			runValidator: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
	});
});

exports.deleteRequest = catchAsyncErrors(async (req, res, next) => {
	const request = await Request.findById(req.params.id);
  const value = await Request.findById(req.params.id)
  if (value.status != 'Submitted'){
    return res.status(400).json({ message: "You can not update already approved request" });
  }

	if (!request) {
		return next(new ErrorHandler("Request not found with this id", 400));
	}

	await request.deleteOne();

	res.status(200).json({
		success: true,
		message: "Request deleted successfully",
	});
});