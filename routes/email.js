// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const { sendEmail, handleContactForm } = require('../controllers/emailController');

router.post('/send', sendEmail);
router.post('/contact', handleContactForm);

module.exports = router;