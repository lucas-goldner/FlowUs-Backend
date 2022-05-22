import * as i18n from "i18n";
import * as path from "path";

i18n.configure({
  locales: ["en", "de"],
  defaultLocale: "en",
  directory: path.join(__dirname, "/../assets/locales"),
});

export default i18n;
