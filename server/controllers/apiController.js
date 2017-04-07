/**
 * Statics router.
 */
const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'runeeemail@gmail.com',
    pass: 'Senica313',
  },
});

/**
 * GET: Index
 */
router.get('/', (req, res) => {
  res.render('static/index');
});

/**
 * POST: Email send
 */
router.post('/send-email', (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const subject = req.body.subject;
  const text = req.body.text;

  const mailOptions = {
    from: email,
    to: 'runeeemail@gmail.com',
    subject,
    text,
    html: `<p>${text}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
});

module.exports = router;
