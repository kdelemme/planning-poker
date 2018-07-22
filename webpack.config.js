const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackConfigForEnv = (env = "dev") =>
  new HtmlWebpackPlugin({
    template: `./webpack/index.${env}.html`,
    filename: "index.html",
    inject: "body"
  });

module.exports = (env = "dev") => ({
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: { loader: "babel-loader" } }]
  },
  externals: {
    Config: require(`./config.${env}.json`)
  },
  devtool: "eval-source-map",
  plugins: [htmlWebpackConfigForEnv(env)]
});
