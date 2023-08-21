const express = require("express");
const { createRequest, logoutStaff } = require("../controller/StaffController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router
  .route("/createRequest")
  .post(isAuthenticatedUser, authorizeRoles("staff"), createRequest);
router
  .route("/logoutStaff")
  .get(isAuthenticatedUser, authorizeRoles("staff"), logoutStaff);

module.exports = router;
