import "dotenv/config";
import * as functions from "firebase-functions-test";
import * as path from "path";
import { anyContext, anyData, anyEmptyContext } from "./helpers/testConstants";
import { https } from "firebase-functions/v1";
import Message from "../src/types/message";
import getError from "./helpers/helperFunctions";

const projectConfig = {
  projectId: "flowus-app-dev",
  databaseURL: process.env.DATABASE_URL,
};

const testEnv = functions(projectConfig, path.resolve("./flowus-app-dev-fb-admin-sdk-key.json"));

import { verify } from "../src";

describe('Testing "helloWorld"', () => {
  it("test helloWorld if function works", async () => {
    const result: Message = await testEnv.wrap(verify)(anyData, anyContext);
    expect(result.code).toBe(400);
    // expect(result.message.length).toBe(6);
  });

  it("test helloWorld throws error because no context was given", async () => {
    const error = await getError(async () => await testEnv.wrap(verify)(anyData, anyEmptyContext));
    expect(error).toBeInstanceOf(https.HttpsError);
  });
});
