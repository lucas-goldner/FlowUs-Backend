import { region, https } from "firebase-functions/v1";
import Message from "../types/message";

const generateId = (length: number) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const verifyHandler = region("europe-west1").https.onCall((_, context) => {
  if (context.app == undefined) {
    throw new https.HttpsError("failed-precondition", "The function must be called from an App Check verified app.");
  }

  const message: Message = {
    text: generateId(6),
    code: 200,
  };

  return message;
});

export default verifyHandler;