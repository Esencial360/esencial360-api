const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createNewBlog)
  .put(blogController.updateBlog)
  .delete(blogController.deleteBlog);

router.route("/:id").get(blogController.getBlog);

module.exports = router;