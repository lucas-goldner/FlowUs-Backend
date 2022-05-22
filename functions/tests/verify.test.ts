import "dotenv/config";
import * as functions from "firebase-functions-test";
import * as path from "path";
import { anyContext, emptyData, emptyContext, anyUsername, anyEmail } from "./helpers/testConstants";
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
      locale: "de",
      userName: anyUsername,
      email: "lucas.goldner@googlemail.com",
    };
    const result: Message = await testEnv.wrap(verify)(data, anyContext);
    expect(result.code).toBe(200);
    expect(result.message).toBe("Code was created and email is sent!");
  });

  it("test verification function throws error if locale is missing", async () => {
    const data = {
      userName: anyUsername,
      email: anyEmail,
    };
    const result: Message = await testEnv.wrap(verify)(data, anyContext);
    expect(result.code).toBe(400);
    expect(result.message).toBe("Not all data was provided");
  });

  it("test verification function throws error if userName is missing", async () => {
    const data = {
      locale: "en",
      email: anyEmail,
    };
    const result: Message = await testEnv.wrap(verify)(data, anyContext);
    expect(result.code).toBe(400);
    expect(result.message).toBe("Not all data was provided");
  });

  it("test verification function throws error if email is missing", async () => {
    const data = {
      locale: "en",
      userName: anyUsername,
    };
    const result: Message = await testEnv.wrap(verify)(data, anyContext);
    expect(result.code).toBe(400);
    expect(result.message).toBe("Not all data was provided");
  });

  it("test verification throws error because no context was given", async () => {
    const error = await getError(async () => await testEnv.wrap(verify)(emptyData, emptyContext));
    expect(error).toBeInstanceOf(https.HttpsError);
  });
});
