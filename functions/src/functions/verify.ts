import { region, https } from "firebase-functions/v1";
// import { VERFIY_CODES_PATH } from "../helpers/constants";
// import { db } from "../helpers/firebaseServices";
import Message from "../types/message";

const verifyHandler = region("europe-west1").https.onCall(async (data, context) => {
  if (context.app == undefined) {
    throw new https.HttpsError("failed-precondition", "The function must be called from an App Check verified app.");
  }

  if (data == undefined || data.userName == undefined || data.locale == undefined) {
    const message: Message = {
      message: "Not all data was provided",
      code: 400,
    };

    return message;
  }

  // const uid = context?.auth?.uid;
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  const codeLength = 6;
  for (let i = 0; i < codeLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // await db.collection(VERFIY_CODES_PATH).doc().set({
  //   user: uid,
  //   code: result,
  // });

  const message: Message = {
    message: result,
    code: 200,
  };

  return message;
});

export default verifyHandler;
