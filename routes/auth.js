const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     description: Authenticates a user and provides access and refresh tokens upon successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "johndoe"
 *               pwd:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *                 example: "mysecurepassword"
 *     responses:
 *       200:
 *         description: Login successful. Returns an access token in the response body and a refresh token in a cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token for authorization.
 *       400:
 *         description: Bad request. Missing username or password.
 *       401:
 *         description: Unauthorized. Invalid credentials.
 */

router.post('/', authController.handleLogin);

module.exports = router;