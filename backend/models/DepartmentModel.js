const mongoose = require("mongoose");
//super adminu departemet add yemiyadergebt
const DepartmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  deanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dean",
  },
  staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
  ],
  // students: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Student",
  //   },
  // ],
});

DepartmentSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
DepartmentSchema.set("toJSON", { virtuals: true });

DepartmentSchema.virtual("myFaculty", {
  ref: "Faculty",
  localField: "facultyId",
  foreignField: "_id",
  justOne: true,
});

DepartmentSchema.virtual("myDean", {
  ref: "User",
  localField: "_id",
  foreignField: "departmentId",
  options: { match: { role: "Dean" } },
});

DepartmentSchema.virtual("myStaff", {
  ref: "User",
  localField: "_id",
  foreignField: "departmentId",
  options: { match: { role: "Staff" } },
});

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
