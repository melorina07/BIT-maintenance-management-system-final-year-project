const express = require("express");

const { createRequest, getAllRequests, updateRequest, deleteRequest, approveRequest, assignRequest, responseRequest, report } = require("../controller/RequestController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authenticate");
//const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
//router.post("/form", formController.createForm);

//const { checkRole } = require("../middleware/authenticate");
//const { isAuthenticatedUser } = require("../middleware/authenticate");
const router = express.Router();

module.exports = router;
//router.route("/stafform", checkRoleStaff).post(createStaffform);

router.route("/request").post(isAuthenticatedUser, createRequest);
router.route("/request").get(isAuthenticatedUser, getAllRequests);
router.route("/request/:id").patch(isAuthenticatedUser, updateRequest);
router.route("/request/:id").delete(isAuthenticatedUser, deleteRequest);
router.route("/request/:id/approval").patch(isAuthenticatedUser, approveRequest);
router.route("/request/:id/assign").patch(isAuthenticatedUser, assignRequest);
router.route("/request/:id/response").patch(isAuthenticatedUser, responseRequest);
router.route("/request/report").get(isAuthenticatedUser, report);

module.exports = router;
