/**
 * Statics router.
 */
const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'leafprojectslinto@gmail.com',
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
  const email = req.body.email;
  const userID = req.body.id;
  const subject = req.body.subject;
  const message = req.body.message;

  console.log(req.body);

  const mailOptions = {
    from: email,
    to: 'tomco3131@gmail.com',
    subject,
    text: `${email} / ${userID}: ${message}`,
    html: `<p> USER: ${email} / ${userID}<br> Message: ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);

    res.json({ status: 'ok' });
  });
});

module.exports = router;
