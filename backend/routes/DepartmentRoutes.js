const express = require("express");
const {
	createDepartment,
	getAllDepartments,
	updateDepartment,
	deleteDepartment,
} = require("../controller/DepController");
const {
	isAuthenticatedUser,
	authorizeRoles,
} = require("../middleware/authenticate");

const router = express.Router();

router.route("/department").post(isAuthenticatedUser, createDepartment);
router.route("/department").get(isAuthenticatedUser, getAllDepartments);
router.route("/department/:id").patch(isAuthenticatedUser, updateDepartment);
router.route("/department/:id").delete(isAuthenticatedUser, deleteDepartment);

module.exports = router;
