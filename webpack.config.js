/* webpack config */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: path.join(__dirname, 'src', 'js', 'whack-a-mole.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'whackamole.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    HtmlPluginConfig,
    extractSass
  ]
}
