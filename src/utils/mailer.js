import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export const sendingMailTo = async (emailID, token) => {
  console.log("emailID node mailer", emailID);
  //transporter object using the default SMTP transport to transport to mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SENDER, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail( {
    from: process.env.SENDER, // sender address
    to: emailID, // list of receivers
    subject: "Hello Message", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:5000/${token}">click here</a></h1>`, // html body
  });
}

export const Rabbitmq_sendMail = async (emailID) => {
  const transporter =  nodemailer.createTransport({
      service :"gmail",
      auth: {
        user : process.env.SENDER,
        pass : process.env.PASSWORD
      },
  });
  
  let info = await transporter.sendMail( {
      form : process.env.SENDER,
      to: emailID,
      subject : "rabbitmq trial",
      html :`<h1>User Registration Successfull</h1>`
  });
}
   
//   // console.log("Message sent: %s", info.messageId);
//   // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // // Preview only available when sending through an Ethereal account
//   // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
