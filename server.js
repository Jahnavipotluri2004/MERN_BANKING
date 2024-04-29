const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); // Add body-parser
const app = express();
const port = 3001;

app.use(bodyParser.json()); // Use body-parser middleware to parse JSON data

// Configure your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use Gmail as the email service
  auth: {
    user: 'anyabankonit@gmail.com', // Replace with your Gmail email
    pass: 'anyaforger', // Replace with your Gmail password or an app-specific password
  },
});

// Define a route for sending email notifications
app.post('/send-email', (req, res) => {
  const { userEmail } = req.body;

  // Compose the email content
  const mailOptions = {
    from: 'anyabankonit@gmail.com', // Replace with your Gmail email
    to: userEmail,
    subject: 'Successful Login Notification',
    text: 'You have successfully logged in to your account.',
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email notification error:', error);
      res.status(500).send('Email notification failed');
    } else {
      console.log('Email notification sent:', info.response);
      res.status(200).send('Email notification sent');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
