import * as admin from "firebase-admin";

// Needs to be initialized first otherwise tests throw errors
admin.initializeApp();

import helloWorldHandler from "./functions/helloworld";
import verifyHandler from "./functions/verify";

export const helloWorld = helloWorldHandler;
export const verify = verifyHandler;
