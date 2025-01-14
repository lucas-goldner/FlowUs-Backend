import "dotenv/config";
import { region, https, logger } from "firebase-functions/v1";
import { VERFIY_CODES_PATH } from "../helpers/constants";
import { db } from "../helpers/firebaseServices";
import Message from "../types/message";
import * as nodemailer from "nodemailer";
import * as fs from "fs";
import i18n from "../helpers/locales";

const verifyHandler = region("europe-west1").https.onCall(async (data, context) => {
  // Handle failing appcheck
  if (context.app == undefined) {
    throw new https.HttpsError("failed-precondition", "The function must be called from an App Check verified app.");
  }

  // Handle missing data required for this function
  if (data == undefined || data.userName == undefined || data.locale == undefined || data.email == undefined) {
    const message: Message = {
      message: "Not all data was provided",
      code: 400,
    };

    return message;
  }

  logger.log("All data for verification data is defined");

  // Setup important variables
  i18n.setLocale(data.locale);
  const uid = context?.auth?.uid;
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  const codeLength = 6;
  for (let i = 0; i < codeLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // Create document in firestore
  await db.collection(VERFIY_CODES_PATH).doc().set({
    user: uid,
    code: result,
  });
  logger.log("Firestore document was created for " + uid);

  // Setup mail instance
  const transporter = nodemailer.createTransport({
    host: String(process.env.MAIL_HOST),
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(process.env.MAIL_SECURE),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let mailContent = fs.readFileSync(__dirname + "/../assets/verifyEmail.html", "utf-8");

  // Go over mail and replace portions with language specific parts
  mailContent = mailContent.replace(/WELCOME/g, i18n.__("Welcome"));
  mailContent = mailContent.replace(/STEPS/g, i18n.__("List"));
  mailContent = mailContent.replace(/VERIFY/g, i18n.__("Verify"));
  mailContent = mailContent.replace(/BUTTON/g, i18n.__("Button"));
  mailContent = mailContent.replace(/NAME/g, data.userName);
  mailContent = mailContent.replace(/DATE/g, new Date().toDateString());
  mailContent = mailContent.replace(/NUMBER/g, result);
  mailContent = mailContent.replace(/DYNAMIC_LINK/g, "https://flowus.io");
  mailContent = mailContent.replace(/DEAR/g, i18n.__("Dear"));
  mailContent = mailContent.replace(/SINCERELY/g, i18n.__("Sincerely"));
  mailContent = mailContent.replace(/CTO/g, i18n.__("CTO"));

  // Prepare mail
  const mailOptions = {
    from: '"Lucas 🍋" <lucas@flowus.io>',
    to: data.email,
    subject: "Welcome to FlowUs 🌎 - Verify now ✔️",
    html: mailContent,
  };

  // Send mail
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
