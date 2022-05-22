import * as functions from "firebase-functions-test";
import { https } from "firebase-functions/v1";
import verifyHandler from "../src/functions/verify";
import Message from "../src/types/message";
import getError from "./helpers/helperFunctions";
import { anyContext, anyContextWithApp, anyData } from "./helpers/testConstants";

describe('Testing "helloWorld"', () => {
  const test = functions();
  it("test helloWorld if function works", async () => {
    const result: Message = await test.wrap(verifyHandler)(anyData, anyContextWithApp);
    expect(result.code).toBe(200);
    expect(result.message.length).toBe(6);
  });

  it("test helloWorld throws error because no context was given", async () => {
    const error = await getError(async () => await test.wrap(verifyHandler)(anyData, anyContext));
    expect(error).toBeInstanceOf(https.HttpsError);
  });
});
