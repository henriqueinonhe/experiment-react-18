const path = require("path");

const sharedConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: process.env.NODE_ENV,
  plugins: [],
};

const clientConfig = {
  ...sharedConfig,
  entry: {
    client: "./src/client/index.jsx",
  },
  target: "web",
};

const serverConfig = {
  ...sharedConfig,
  entry: {
    server: "./src/server/index.jsx",
  },
  target: "node",
};

module.exports = [clientConfig, serverConfig];
