import "dotenv/config";
import * as functions from "firebase-functions-test";
import * as path from "path";
import { anyContext, anyData, anyEmptyContext, anyUsername } from "./helpers/testConstants";
import { https } from "firebase-functions/v1";
import Message from "../src/types/message";
import getError from "./helpers/helperFunctions";

const projectConfig = {
  projectId: "flowus-app-dev",
  databaseURL: process.env.DATABASE_URL,
};

const testEnv = functions(projectConfig, path.resolve("./flowus-app-dev-fb-admin-sdk-key.json"));

import { verify } from "../src";

describe('Testing "verification"', () => {
  it("test verification function works", async () => {
    const data = {
      locale: "en",
      userName: anyUsername,
    };
    const result: Message = await testEnv.wrap(verify)(data, anyContext);
    expect(result.code).toBe(200);
    expect(result.message.length).toBe(6);
  });

  it("test verification function throws error if locale is missing", async () => {
    const data = {
      userName: anyUsername,
    };
    const result: Message = await testEnv.wrap(verify)(data, anyContext);
    expect(result.code).toBe(400);
    expect(result.message).toBe("Not all data was provided");
  });

  it("test verification function throws error if userName is missing", async () => {
    const data = {
      locale: "en",
    };
    const result: Message = await testEnv.wrap(verify)(data, anyContext);
    expect(result.code).toBe(400);
    expect(result.message).toBe("Not all data was provided");
  });

  it("test verification throws error because no context was given", async () => {
    const error = await getError(async () => await testEnv.wrap(verify)(anyData, anyEmptyContext));
    expect(error).toBeInstanceOf(https.HttpsError);
  });
});
