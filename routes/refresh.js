const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     description: Obtains a new access token using a valid refresh token.
 *     parameters:
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         description: Refresh token cookie.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Refresh successful. Returns a new access token in the response body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token for authorization.
 *       401:
 *         description: Unauthorized. No refresh token provided.
 *       403:
 *         description: Forbidden. Invalid or expired refresh token.
 */

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;