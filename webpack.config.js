const path = require('path');

module.exports = (env, argv) => {
  const mode = argv.mode || "development";
  const config = {
    entry: path.join(__dirname, "src/index.js"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: mode === "development" ? "index.js" : "index.min.js"
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: "babel-loader",
          exclude: /node_modules/
        }
      ]
    },
    mode: mode,
    resolve: {
      extensions: [".js"]
    }
  };

  if (mode === "production") {
    config.devtool = "source-map";
  }

  return config;
};