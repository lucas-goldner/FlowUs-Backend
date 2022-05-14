import { region } from "firebase-functions/v1";
import Message from "../types/message";

const helloWorldHandler = region("europe-west1").https.onCall(() => {
  const message: Message = {
    text: "Verification worked",
    code: 200,
  };
  return message;
});

export default helloWorldHandler;
