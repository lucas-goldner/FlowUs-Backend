import "dotenv/config";
import * as functions from "firebase-functions-test";
import * as path from "path";
import { anyContextWithApp, emptyData, emptyContext } from "./helpers/testConstants";
import { https } from "firebase-functions/v1";
import Message from "../src/types/message";
import getError from "./helpers/helperFunctions";

const projectConfig = {
  projectId: "flowus-app-dev",
  databaseURL: process.env.DATABASE_URL,
};
const testEnv = functions(projectConfig, path.resolve("./flowus-app-dev-fb-admin-sdk-key.json"));

import { helloWorld } from "../src";

describe('Testing "helloWorld"', () => {
  it("test helloWorld if function works", async () => {
    const result: Message = await testEnv.wrap(helloWorld)(emptyData, anyContextWithApp);
    expect(result.code).toBe(200);
    expect(result.message).toBe("Hello from Firebase!");
  });

  it("test helloWorld throws error because no context was given", async () => {
    const error = await getError(async () => await testEnv.wrap(helloWorld)(emptyData, emptyContext));
    expect(error).toBeInstanceOf(https.HttpsError);
  });
});
