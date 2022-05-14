import { logger, region } from "firebase-functions/v1";
import Message from "../types/message";

const helloWorldHandler = region("europe-west1").https.onCall(() => {
  logger.info("Hello logs!", { structuredData: true });
  const message: Message = {
    text: "Hello from Firebase!",
    code: 200,
  };
  return message;
});

export default helloWorldHandler;
