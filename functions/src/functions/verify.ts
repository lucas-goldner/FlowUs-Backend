import "dotenv/config";
import { region, https, logger } from "firebase-functions/v1";
import { VERFIY_CODES_PATH } from "../helpers/constants";
import { db } from "../helpers/firebaseServices";
import * as nodemailer from "nodemailer";
import Message from "../types/message";

const verifyHandler = region("europe-west1").https.onCall(async (data, context) => {
  if (context.app == undefined) {
    throw new https.HttpsError("failed-precondition", "The function must be called from an App Check verified app.");
  }

  if (data == undefined || data.userName == undefined || data.locale == undefined || data.email == undefined) {
    const message: Message = {
      message: "Not all data was provided",
      code: 400,
    };

    return message;
  }

  logger.log("All data for verification data is defined");
  const uid = context?.auth?.uid;
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  const codeLength = 6;
  for (let i = 0; i < codeLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  await db.collection(VERFIY_CODES_PATH).doc().set({
    user: uid,
    code: result,
  });
  logger.log("Firestore document was created for " + uid);

  const transporter = nodemailer.createTransport({
    host: String(process.env.MAIL_HOST),
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(process.env.MAIL_SECURE),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Lucas 🍋" <lucas@flowus.io>',
    to: data.email,
    subject: "Welcome to FlowUs 🌎 - Verify now ✔️", // Subject line
    html: "mailContent", //
  };

  await transporter.sendMail(mailOptions).catch((e: Error) => {
    logger.error("Email creation has failed with: " + e.message);
    const message: Message = {
      message: "Email could not be sent",
      code: 400,
    };

    return message;
  });

  logger.log("Email has been created");
  const message: Message = {
    message: "Code was created and email is sent!",
    code: 200,
  };

  return message;
});

export default verifyHandler;
