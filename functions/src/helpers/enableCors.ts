import * as functions from "firebase-functions";

export const enableCors = (req: functions.Request, res: functions.Response): boolean => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    res.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.set("Access-Control-Max-Age", "3600");
    res.sendStatus(204);
    return false;
  }

  return true;
};
