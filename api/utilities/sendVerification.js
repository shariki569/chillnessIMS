import nodemailer from "nodemailer";

console.log(process.env.EMAIL + " " + process.env.PASSWORD);

export const sendVerificatonEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSWORD}`,
    },
  });

  //compose email message
  const mailOptions = {
    from: "Chillness",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email : http://192.168.0.103:8888/api/register/verify/${verificationToken}`,
  };

  //send the email
  try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent");
  }catch(err) {
    console.log('Error Sending verification email', err);
  }
};


