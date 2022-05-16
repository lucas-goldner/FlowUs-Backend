import "jest";
import helloWorld from "../src/functions/helloworld";
import Message from "../src/types/message";

describe("helloworld", () => {
  test("it should run", () => {
    const req = { body: { data: {} } };
    const res = {
      on: (response: Message) => {
        expect(response).toBe({ text: "Hello from Firebase!", code: 200 });
      },
    };

    helloWorld(req as any, res as any);
  });
});
