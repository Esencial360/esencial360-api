const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController'); 
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a list of all users. Requires admin role.
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of user objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       204:
 *         description: No users found.
 *       401:
 *         description: Unauthorized. Missing or invalid authentication token.
 *       403:
 *         description: Forbidden. Insufficient permissions (not an admin).
 */
router.get('/', verifyRoles(ROLES_LIST.Admin), userController.getAllUsers);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Delete a user by their ID. Requires admin role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully. Returns the deleted user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. User ID is required.
 *       401:
 *         description: Unauthorized. Missing or invalid authentication token.
 *       403:
 *         description: Forbidden. Insufficient permissions (not an admin).
 *       404:
 *         description: Not found. User with the specified ID was not found.
 */
router.delete('/', verifyRoles(ROLES_LIST.Admin), userController.deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a user by their ID. Requires admin role.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Successful operation. Returns the user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. User ID is required.
 *       401:
 *         description: Unauthorized. Missing or invalid authentication token.
 *       403:
 *         description: Forbidden. Insufficient permissions (not an admin).
 *       404:
 *         description: Not found. User with the specified ID was not found.
 */
router.get('/:id', verifyRoles(ROLES_LIST.Admin), userController.getUser);

module.exports = router;