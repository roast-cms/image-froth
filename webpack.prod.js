const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src/index.ts"),
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
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "umd",
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/types.d.ts", to: "types.d.ts" }],
    }),
  ],
};
