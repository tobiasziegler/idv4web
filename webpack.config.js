const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    new_element: './src/01-new-element.js',
    data: './src/02-data.js',
    div_bar_chart: './src/03-div-bar-chart.js',
    circles: './src/04-circles.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: '01-new-element.html',
      template: __dirname + '/public/01-new-element.html',
      chunks: ['new_element']
    }),
    new HtmlWebpackPlugin({
      filename: '02-data.html',
      template: __dirname + '/public/02-data.html',
      chunks: ['data']
    }),
    new HtmlWebpackPlugin({
      filename: '03-div-bar-chart.html',
      template: __dirname + '/public/03-div-bar-chart.html',
      chunks: ['div_bar_chart']
    }),
    new HtmlWebpackPlugin({
      filename: '04-circles.html',
      template: __dirname + '/public/04-circles.html',
      chunks: ['circles']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    open: true,
    overlay: true
  }
};
