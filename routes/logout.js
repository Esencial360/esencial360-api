const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout User
 *     tags: [Authentication]
 *     description: Logs the user out by clearing the refresh token cookie and removing the token from the database.
 *     parameters:
 *       - in: cookie
 *         name: jwt
 *         required: false 
 *         description: Refresh token cookie (JWT).
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Logout successful. No content returned. Refresh token cookie cleared.
 *       401:
 *         description: Unauthorized. No refresh token cookie found.
 *       500: 
 *         description: Internal Server Error. An unexpected error occurred while processing the request.
 */

router.get('/', logoutController.handleLogout);

module.exports = router;