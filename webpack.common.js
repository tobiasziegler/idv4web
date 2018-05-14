const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    new_element: './src/01-new-element.js',
    data: './src/02-data.js',
    div_bar_chart: './src/03-div-bar-chart.js',
    circles: './src/04-circles.js',
    svg_bar_chart: './src/05-svg-bar-chart.js',
    scatterplot: './src/06-scatterplot.js',
    time_scale: './src/07-time-scale.js',
    line_chart: './src/08-line-chart.js',
    area_chart: './src/09-area-chart.js',
    freakout: './src/10-freakout.js'
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
    }),
    new HtmlWebpackPlugin({
      filename: '05-svg-bar-chart.html',
      template: __dirname + '/public/05-svg-bar-chart.html',
      chunks: ['svg_bar_chart']
    }),
    new HtmlWebpackPlugin({
      filename: '06-scatterplot.html',
      template: __dirname + '/public/06-scatterplot.html',
      chunks: ['scatterplot']
    }),
    new HtmlWebpackPlugin({
      filename: '07-time-scale.html',
      template: __dirname + '/public/07-time-scale.html',
      chunks: ['time_scale']
    }),
    new HtmlWebpackPlugin({
      filename: '08-line-chart.html',
      template: __dirname + '/public/08-line-chart.html',
      chunks: ['line_chart']
    }),
    new HtmlWebpackPlugin({
      filename: '09-area-chart.html',
      template: __dirname + '/public/09-area-chart.html',
      chunks: ['area_chart']
    }),
    new HtmlWebpackPlugin({
      filename: '10-freakout.html',
      template: __dirname + '/public/10-freakout.html',
      chunks: ['freakout']
    }),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/public/data',
        to: __dirname + '/dist/data'
      }
    ])
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
  }
};
