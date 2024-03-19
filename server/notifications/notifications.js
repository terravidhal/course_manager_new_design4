const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendNewInstructorNotification(instructorInfo) {
  try {
    const info = await transporter.sendMail({
      from: { name: 'vidhal', address: process.env.EMAIL_ADMIN },
      to: process.env.EMAIL_ADMIN_SITE, //  site administrator email
    //  to: process.env.EMAIL_ADMIN_SITE_DOJO , 
      subject: "New Instructor Registered ✔",
      text: `A new instructor has registered with the name : ${instructorInfo.name} and email : ${instructorInfo.email}`,
      html: `A new <b>instructor</b> has registered with the <b>name</b> : &nbsp;<b>${instructorInfo.name}</b> and <b>email</b> :  &nbsp;<b>${instructorInfo.email}</b>. Please remember to grant them <b>access</b> after verification. Sincerely, The <b>Marsile-Vidhal Team</b>`, // Consider a more informative HTML body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}


module.exports = {
  sendNewInstructorNotification
}; 



