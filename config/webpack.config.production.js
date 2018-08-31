const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PORT = process.env.PORT || 3000;

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '..', 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'static/[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, '..', 'public', 'index.html'),
        title: ':gift: Spiritual Gifts Survey',
        favicon: 'public/favicon.ico'
      }
    ),
    new MiniCssExtractPlugin(
      {
        filename: '[name].css',
        chunkFilename: '[id].css'
      }
    )
  ],
  devServer: {
    host: 'localhost',
    port: PORT,
    historyApiFallback: true,
    open: true
  }
}