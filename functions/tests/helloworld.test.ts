import * as functions from "firebase-functions-test";
import helloWorldHandler from "../src/functions/helloworld";
import Message from "../src/types/message";

describe('Testing "helloWorld"', () => {
  it("test helloWorld if function works", async () => {
    const test = functions();
    const data = {};
    const context = {
      app: {},
    };
    const result: Message = await test.wrap(helloWorldHandler)(data, context);
    expect(result.code).toBe(200);
    expect(result.text).toBe("Hello from Firebase!");
  });
});
