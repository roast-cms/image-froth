module.exports = {
  entry: "./examples/index.js",
  output: {
    filename: "./lib/bundle.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 3002
  },
  devtool: "inline-source-map"
}
