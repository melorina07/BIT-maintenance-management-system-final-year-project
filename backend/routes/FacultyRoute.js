const express = require("express");
const { createFaculty, getAllFaculities, updateFaculity, deleteFaculity } = require("../controller/FacultyController");

const router = express.Router();

router.route("/faculity").post(createFaculty);
router.route("/faculity").get(getAllFaculities);
router.route("/faculity/:id").patch(updateFaculity);
router.route("/faculity/:id").delete(deleteFaculity);

module.exports = router;
