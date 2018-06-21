const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
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
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: { loader: "babel-loader" } }]
  },
  externals: {
    Config: JSON.stringify(
      process.env.NODE_ENV === "production" ? require("./config.prod.json") : require("./config.dev.json")
    )
  },
  devtool: "eval-source-map",
  plugins: [HtmlWebpackPluginConfig]
};
