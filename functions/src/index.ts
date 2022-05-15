import * as admin from "firebase-admin";

import helloWorldHandler from "./functions/helloworld";

admin.initializeApp();

exports.helloWorld = helloWorldHandler;
