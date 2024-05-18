const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController'); 
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');


router.get('/', userController.getAllUsers);
router.delete('/', userController.deleteUser);
router.get('/:id', userController.getUser);

module.exports = router;