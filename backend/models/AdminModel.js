const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name of youself"],
    minLength: [3, "please enter alist 3 characters"],
    maxLength: [20, "name can not be biger than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "please enter your password password "],
    minLength: [8, "please enter atleast 8 nnumber"],
  },

  contact: {
    required: true,
    type: Number,
    unique: true,
  },
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  role: {
    type: String,
    default: "Admin",
    required: true,
  },
  // blocked: {
  //     type: Boolean,
  //     default: false
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dean",
    },
  ],
  request: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],

  resetPasswordToken: String,
  resetPasswordTime: Date,
});

AdminSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
AdminSchema.set("toJSON", { virtuals: true });

AdminSchema.virtual("department", {
  ref: "Department",
  localField: "departmentId",
  foreignField: "_id",
  justOne: true,
});

AdminSchema.virtual("myStaff", {
  ref: "Admin",
  localField: "_id",
  foreignField: "deanId",
  options: { match: { role: "staff" } },
});

// AdminSchema.virtual("myrequest", {
//   ref: "Request",
//   localField: "_id",
//   foreignField: "staffId",
// });

//hash password
AdminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});
AdminSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
AdminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", AdminSchema);
