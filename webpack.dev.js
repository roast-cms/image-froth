const path = require("path");
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "example/index.ts"),
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  output: {
    filename: "example.js",
    path: path.resolve(__dirname, "dist"),
  },
};
