var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'realityexpandermail@gmail.com',
    pass: 'vxieyizilwmcboec'
  }
});
  
function sendEmail(address, message) {
  const mailOptions = {
    from: 'realityexpanderdev@gmail.com',
    to: address,
    subject: 'Sending Email using Node.js',
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendEmail