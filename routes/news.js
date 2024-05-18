const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

router
    .route("/")
    .get(newsController.getAllNews)
    .post(newsController.createNewNews)
    .put(newsController.updateNews)
    .delete(newsController.deleteNews);

router.route("/:id").get(newsController.getNews);

module.exports = router;