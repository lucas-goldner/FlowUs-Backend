import helloWorldHandler from "./functions/helloworld";
import verifyHandler from "./functions/verify";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.helloWorld = helloWorldHandler;
exports.verify = verifyHandler;
