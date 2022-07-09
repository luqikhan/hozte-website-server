import nodemailer from "nodemailer";
import { HOST_EMAIL, HOST_EMAIL_PASS } from "../constants/index.js";

const sendMail = async (email, subject, text, html) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: HOST_EMAIL, // generated ethereal user
        pass: HOST_EMAIL_PASS, // generated ethereal password
      },
    });

    const msg = {
      html,
      text,
      subject,
      to: HOST_EMAIL,
      from: email,
    };
    // console.log(msg);

    await transporter.sendMail(msg, function (error, body) {
      if (error) {
        console.log("ERROR_MAILING", error.message);
      } else {
        console.log("MAIL_SENT", body);
      }
    });
  } catch (err) {
    console.log("ERROR_MAILING", err.message);
  } finally {
    return;
  }
};

export default sendMail;
