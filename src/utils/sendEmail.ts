// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT),
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

// export const sendEmail = async (to: string, subject: string, text: string) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text
//     };
//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (error) {
//     return false;
//   }
// }