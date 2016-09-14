'use strict';


const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    test: './test/test.js'
  },
  output: {
    path: './bin',
    filename: 'alien-[name].js',
    publicPath: '/static'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Alien Test Page",
      filename: "index.html"
    })
  ]
};
