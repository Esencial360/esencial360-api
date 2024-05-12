const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

/**
 * @swagger
 * /auth/logout:
 *   post: 
 *     summary: User logout
 *     tags: [Authentication]
 *     description: Logs the user out by clearing the refresh token cookie and removing the token from the database.
 *     parameters:
 *       - in: cookie
 *         name: jwt
 *         required: false
 *         description: Refresh token cookie.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Logout successful. No content is returned.
 *       401:
 *         description: Unauthorized. Refresh token not found or invalid.
 */

router.get('/', logoutController.handleLogout);

module.exports = router;