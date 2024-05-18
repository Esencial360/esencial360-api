const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

// router
//   .route("/")
//   .get(instructorController.getAllInstructors)
//   .post(
//     verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
//     instructorController.createNewInstructor
//   )
//   .put(
//     verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
//     instructorController.updateInstructor
//   )
//   .delete(verifyRoles(ROLES_LIST.Admin), instructorController.deleteInstructor);
router
  .route("/")
  .get(instructorController.getAllInstructors)
  .post(instructorController.createNewInstructor)
  .put(instructorController.updateInstructor)
  .delete(instructorController.deleteInstructor);

router.route("/:id").get(instructorController.getInstructor);

module.exports = router;
