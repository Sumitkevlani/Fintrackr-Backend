import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'elouise43@ethereal.email',
        pass: 'fUQTwhcSADMnh5dnQC'
    }
});


export async function sendEmail(to, resetLink) {
    try {

      const mailOptions = {
        from: 'sumitkevlani1234@gmail.com',
        to: to,
        subject: 'Reset your password',
        html: `<p>This is the link for resetting your password: ${resetLink}
               It is valid for 1 hour.</p>`
      };
  
      const info = await transporter.sendMail(mailOptions);
  
      console.log('Email sent:', info.response);
    } catch (error) {
      console.log('Error sending email:', error);
      throw error;
    }
  }