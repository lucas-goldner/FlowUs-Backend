import * as admin from "firebase-admin";

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();
export const messaging = admin.messaging();
export const remoteConfig = admin.remoteConfig();
export const realTimeDatabase = admin.database();
