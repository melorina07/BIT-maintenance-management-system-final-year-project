//this code can not  add one departemet with the same name more than once
const Department = require("../models/DepartmentModel");
Faculty = require("../models/FacultyModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ObjectId = require('mongodb').ObjectId; 

exports.createDepartment = async (req, res) => {
  const { departmentName, facultyId, deanId } = req.body;
  const existingDepartment = await Department.findOne({
    departmentName,
    facultyId,
  });
  if (existingDepartment) {
    res
      .status(400)
      .json({ message: "Department with this name already exists." });
  } else {
    const department = new Department({ departmentName, facultyId, deanId });
    try {
      await department.save();
      const faculty = await Faculty.findById(facultyId);
      if (faculty) {
        console.log("Faculty found:", faculty);
        faculty.departments.push(department._id);
        await faculty.save();
        res.status(201).json(department);
      } else {
        res.status(404).json({ message: "Faculty not found." });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while creating the department." });
    }
  }
};
////this code can add one departemet with the same name more than once
// const Department = require("../models/DepartmentModel");
// Faculty = require("../models/FacultyModel");

// exports.createDepartment = async (req, res) => {
//   const { departmentName, facultyId, deanId } = req.body;
//   const department = new Department({ departmentName, facultyId, deanId });
//   try {
//     await department.save();
//     const faculty = await Faculty.findById(facultyId);
//     if (faculty) {
//       console.log("Faculty found:", faculty);
//       faculty.departments.push(department._id);
//       await faculty.save();
//       res.status(201).json(department);
//     } else {
//       res.status(404).json({ message: "Faculty not found." });
//     }
//   } catch (err) {
//     if (err.code === 11000 && err.keyValue.departmentName === departmentName) {
//       res
//         .status(400)
//         .json({ message: "Department with this name already exists." });
//     } else {
//       res
//         .status(500)
//         .json({ message: "An error occurred while creating the department." });
//     }
//   }
// };

exports.getAllDepartments = catchAsyncErrors(async (req, res, next) => {
	if (req.user.role == 'Dean' || req.user.role == 'Staff'){
		req.query['_id'] = new ObjectId(req.user.departmentId)
	}
	const departments = await Department.find(req.query);

	res.status(200).json({
		success: true,
		departments,
	});
});

exports.updateDepartment = catchAsyncErrors(async (req, res, next) => {
	const newDepartmentData = {
		...req.body.department,
	};

	const department = await Department.findByIdAndUpdate(
		req.params.id,
		newDepartmentData,
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

exports.deleteDepartment = catchAsyncErrors(async (req, res, next) => {
	const department = await Department.findById(req.params.id);

	if (!department) {
		return next(new ErrorHandler("Department not found with this id", 400));
	}

	await department.deleteOne();

	res.status(200).json({
		success: true,
		message: "Department deleted successfully",
	});
});