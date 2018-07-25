const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlWebpackConfig = new HtmlWebpackPlugin({
  template: process.env.NODE_ENV === "prod" ? "./webpack/index.prod.html" : "./webpack/index.dev.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: "babel-loader" } },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
      }
    ]
  },
  externals: {
    Config: JSON.stringify(
      process.env.NODE_ENV === "prod" ? require("./config.prod.json") : require("./config.dev.json")
    )
  },
  devtool: "eval-source-map",
  plugins: [
    htmlWebpackConfig,
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
