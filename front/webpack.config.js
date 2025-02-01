const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './js/app.js', // Path to your main JavaScript file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html' // Points to your existing index.html file
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Updated from contentBase to static
    },
    compress: true,
    port: 9000,
    open: true // Automatically opens your browser to the dev server URL
  }
};