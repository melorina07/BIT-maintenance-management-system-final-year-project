const express = require("express");
const {
  seeStaff,
  deleteStaff,
  UpdateStaff,
  registerStaff,
} = require("../controller/DeanController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authenticate");

const router = express.Router();
createExam;

router
  .route("/seeStaff")
  .get(isAuthenticatedUser, authorizeRoles("dean"), seeStaff);
router
  .route("/deleteStaff/:id")
  .delete(isAuthenticatedUser, authorizeRoles("dean"), deleteStaff);
router
  .route("/UpdateStaff/:id")
  .put(isAuthenticatedUser, authorizeRoles("dean"), UpdateStaff);
router
  .route("/registerStaff")
  .post(isAuthenticatedUser, authorizeRoles("dean"), registerStaff);

module.exports = router;
