const express = require('express');
const router = express.Router()
const registerController = require('../controllers/registerController')

/**
 * @swagger
 * /register: 
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Creates a new user account in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The username of the new user.
 *                 example: "johndoe"
 *               pwd:
 *                 type: string
 *                 format: password
 *                 description: The password of the new user.
 *                 example: "mysecurepassword"
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Success message.
 *                   example: "New user johndoe created!"
 *       400:
 *         description: Bad request. Username and password are required.
 *       409:
 *         description: Conflict. Username already exists.
 *       500:
 *         description: Internal server error.
 */

router.post('/', registerController.handleNewUser)

module.exports = router; 