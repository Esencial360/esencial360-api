// controllers/emailController.js
require("dotenv").config();
const nodemailer = require("nodemailer");
const Contact = require("../model/Contact");
const NewInstructor = require("../model/NewInstructor");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let info = await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    res
      .status(200)
      .json({ message: "Email sent successfully", messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};

const handleContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Save contact information to the database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Prepare email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    let info = await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "New Contact Form Submission",
      html: emailContent,
    });

    console.log("Message sent: %s", info.messageId);
    res
      .status(200)
      .json({
        message: "Form submitted successfully",
        messageId: info.messageId,
      });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ error: "Error processing contact form" });
  }
};

const handleNewInstructorForm = async (req, res) => {
  const { name, email, message, years } = req.body;
  const resume = req.files["resume"] ? req.files["resume"][0] : null;
  const video = req.files["video"] ? req.files["video"][0] : null;

  if (!name || !email || !message || !years || !resume || !video) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log(req.body);

  try {
    // Save contact information to the database
    const newNewInstructor = new NewInstructor({
      name,
      email,
      message,
      years,
      resume: {
        filename: resume.originalname,
        path: resume.path,
        mimetype: resume.mimetype,
        size: resume.size,
      },
      video: {
        filename: video.originalname,
        path: video.path,
        mimetype: video.mimetype,
        size: video.size,
      },
    });
    await newNewInstructor.save();

    // Prepare email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Years of Experience:</strong> ${years}</p>
      <p><strong>Resume:</strong> Attached</p>
       <p><strong>Video:</strong> Attached</p>
    `;

    let info = await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "Nuevo potencial instructor",
      html: emailContent,
      attachments: [
        {
          filename: resume.originalname,
          path: resume.path,
        },
        {
          filename: video.originalname,
          path: video.path,
        },
      ],
    });

    console.log("Message sent: %s", info.messageId);

    fs.unlink(resume.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
    fs.unlink(video.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    res
      .status(200)
      .json({
        message: "Form submitted successfully",
        messageId: info.messageId,
      });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ error: "Error processing contact form" });
  }
};

module.exports = {
  sendEmail,
  handleContactForm,
  handleNewInstructorForm,
};
