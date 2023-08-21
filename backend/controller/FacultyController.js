const Faculty = require("../models/FacultyModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create a new Faculty
//one faculty can not register with the same name morethan once
exports.createFaculty = async (req, res) => {
	const { name } = req.body;
	const faculty = new Faculty({ name });
	try {
		await faculty.save();
		res.status(201).json(faculty);
	} catch (err) {
		if (err.code === 11000 && err.keyValue.name === name) {
			res
				.status(400)
				.json({ message: "Faculty with this name already exists." });
		} else {
			res
				.status(500)
				.json({ message: "An error occurred while creating the faculty." });
		}
	}
};

exports.getAllFaculities = catchAsyncErrors(async (req, res, next) => {
	const faculities = await Faculty.find();

	res.status(200).json({
		success: true,
		faculities,
	});
});

exports.updateFaculity = catchAsyncErrors(async (req, res, next) => {
	const newFaculityData = {
		...req.body.faculity,
	};

	const faculity = await Faculty.findByIdAndUpdate(
		req.params.id,
		newFaculityData,
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

exports.deleteFaculity = catchAsyncErrors(async (req, res, next) => {
	const faculty = await Faculty.findById(req.params.id);

  console.log(faculty)
	if (!faculty) {
		return next(new ErrorHandler("Faculty not found with this id", 400));
	}

	await faculty.deleteOne();

	res.status(200).json({
		success: true,
		message: "Faculty deleted successfully",
	});
});
