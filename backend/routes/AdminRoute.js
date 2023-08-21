const express = require("express");
const {
  loginAdmin,
  createAdmin,
  //logoutAdmin,
  createDean,
  getDeanById,
} = require("../controller/AdminController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authenticate");
// const { getAllQuestion } = require("../controller/usercontroller");

const router = express.Router();

// router.route("/registration/student").post(isAuthenticatedUser, authorizeRoles("teacher"), registerStudent);
// router.route("/registration/teacher").post(isAuthenticatedUser, authorizeRoles("admin"), registerTeacher);
//router.route("/createCourse").post(createCourse);
router.route("/register").post(createAdmin);
router.route("/createDean").post(createDean);
router.route("/getDeanById/:id").get(getDeanById);

// router.route("/seequestionbytwo/:id").post(isAuthenticatedUser, authorizeRoles("teacher" || "admin"), getAllQuestion);

router.route("/login/admin").post(loginAdmin);
// router
//   .route("/logout/admin")
//   .get(
//     isAuthenticatedUser,
//      authorizeRoles("dean", "staff"),
//       logoutAdmin
//       );
module.exports = router;
