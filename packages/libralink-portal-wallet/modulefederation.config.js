const deps = require("./package.json").dependencies;

module.exports = {
  name: "wallet",
  exposes: {
    "./App": "./src/App",
    "./WalletWithdrawConfirm": "./src/WalletWithdrawConfirm",
  },
  remotes: {
    "libralink-portal-shared": `shared@${process.env.LIBRALINK_PORTAL_SHARED_URL}/remoteEntry.js`,
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
    "react-router-dom": {
      singleton: true,
      requiredVersion: deps["react-router-dom"],
    },
    "react-i18next": {
      singleton: true,
      requiredVersion: deps["react-i18next"],
    },
  },
};
