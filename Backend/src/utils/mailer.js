const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.send2FACode = async (to, code, imageName) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your 2FA Code',
    html: `<p>Your 2FA code is: <strong>${code}</strong></p>
           <p>Generated using image: ${imageName}</p>`,
  });
};
