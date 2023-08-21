const mongoose = require("mongoose");
const csv = require('mongoose-csv-export')
// import csv from 'mongoose-csv-export';
//const jwt = require("jsonwebtoken");
const requestSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  user:{
    type: String,
    required: true,
    ref: 'User'
  },
  department: {
    type: String,
    ref: 'Department',
    required: true,
  },
  maintenanceType: {
    type: String,
    required: true,
  },
  blockName: {
    type: String,
    required: true,
  },
  officeNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Submited'
  },
  response: {
    type: String
  },
  assignedMaintenance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
  // user: {
  //   type: mongoose.Schema.username,
  //   ref: "User",
  //   required: true,
  // },
});
requestSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
module.exports = mongoose.model("Request", requestSchema);
