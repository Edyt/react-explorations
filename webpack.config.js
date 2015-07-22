var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');

module.exports = {

  devtool: 'eval',

  entry: {
    flux: './app/flux/src/js/app.js',
    reflux: './app/reflux/src/js/app.js'
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].js',
    chunkFilename: "[id].chunk.js",
    libraryTarget: 'umd',
    publicPath: '/dist/'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
      { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      { test: /\.md$/, loader: "html-loader!markdown-loader" }
    ]
  },

  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],

  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]
}
