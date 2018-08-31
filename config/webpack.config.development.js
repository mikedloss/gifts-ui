const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PORT = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '..', 'src', 'index.js'),
  output: {
    filename: '[name].[hash].js'
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
            loader: 'style-loader'
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
    )
  ],
  devServer: {
    host: 'localhost',
    port: PORT,
    historyApiFallback: true,
    open: true
  }
}