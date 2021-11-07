const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './static/main.js',
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.svg$/, use: 'svg-inline-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}