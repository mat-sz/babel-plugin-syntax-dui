import { declare } from "@babel/helper-plugin-utils";
import customParser from "babel-parser-dui";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "syntax-dui",

    parserOverride(code, opts) {
      return customParser.parse(code, opts);
    },

    manipulateOptions(opts, parserOpts) {
      // If the Typescript plugin already ran, it will have decided whether
      // or not this is a TSX file.
      if (
        parserOpts.plugins.some(
          p => (Array.isArray(p) ? p[0] : p) === "typescript",
        )
      ) {
        return;
      }

      parserOpts.plugins.push("dui");
    },
  };
});
