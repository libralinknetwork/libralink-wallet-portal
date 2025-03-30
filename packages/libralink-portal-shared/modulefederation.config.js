const deps = require("./package.json").dependencies;

module.exports = {
  name: "shared",
  exposes: {
    "./components": "./src/components",
    "./config/constants": "./src/config/constants",
    "./errors": "./src/errors",
    "./icons": "./src/icons",
    "./lib/auth": "./src/lib/auth",
    "./lib/dynamic-variables": "./src/lib/dynamic-variables",
    "./lib/global": "./src/lib/global",
    "./lib/state-hooks": "./src/lib/state-hooks",
    "./lib/fetch": "./src/lib/fetch",
    "./lib/snackbar": "./src/lib/snackbar",
    "./theme": "./src/theme",
    "./utils": "./src/utils",
    "./hooks": "./src/hooks",
  },
  filename: "remoteEntry.js",
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};
