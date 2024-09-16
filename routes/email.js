// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { sendEmail, handleContactForm, handleNewInstructorForm } = require('../controllers/emailController');

router.post('/send', sendEmail);
router.post('/contact', handleContactForm);
router.post('/new-instructor', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]), handleNewInstructorForm);

module.exports = router;