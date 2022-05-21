import * as functions from "firebase-functions-test";
import { https } from "firebase-functions/v1";
import helloWorldHandler from "../src/functions/helloworld";
import Message from "../src/types/message";
import getError from "./helpers/helperFunctions";
import { anyContext, anyContextWithApp, anyData } from "./helpers/testConstants";

describe('Testing "helloWorld"', () => {
  const test = functions();
  it("test helloWorld if function works", async () => {
    const result: Message = await test.wrap(helloWorldHandler)(anyData, anyContextWithApp);
    expect(result.code).toBe(200);
    expect(result.message).toBe("Hello from Firebase!");
  });

  it("test helloWorld throws error because no context was given", async () => {
    const error = await getError(async () => await test.wrap(helloWorldHandler)(anyData, anyContext));
    expect(error).toBeInstanceOf(https.HttpsError);
  });
});
