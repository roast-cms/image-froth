module.exports = {
  entry: "./examples/index.js",
  output: {
    filename: "bundle.js",
    publicPath: "/lib/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    ]
  },
  resolve: { extensions: ["*", ".js"] },
  devServer: {
    port: 3002,
    historyApiFallback: {
      index: "examples/index.html"
    }
  },
  devtool: "inline-source-map"
};
