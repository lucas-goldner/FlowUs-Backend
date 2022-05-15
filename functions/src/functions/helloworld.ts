import { logger, region, https } from "firebase-functions/v1";
import Message from "../types/message";

const helloWorldHandler = region("europe-west1").https.onCall((_, context) => {
  if (context.app == undefined) {
    throw new https.HttpsError("failed-precondition", "The function must be called from an App Check verified app.");
  }

  logger.info("Hello logs!", { structuredData: true });
  const message: Message = {
    text: "Hello from Firebase!",
    code: 200,
  };
  return message;
});

export default helloWorldHandler;
