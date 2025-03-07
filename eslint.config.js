import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,    // Para reconocer process
        ...globals.jest     // Para reconocer test y expect
      },
    },
  },
  pluginJs.configs.recommended,
];
