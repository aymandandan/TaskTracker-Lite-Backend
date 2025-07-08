const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from:
      process.env.EMAIL_FROM_NAME.concat(process.env.EMAIL_FROM_ADDRESS) ||
      'TaskTracker <noreply@tasktracker.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html, // You can add HTML version of the email here
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
