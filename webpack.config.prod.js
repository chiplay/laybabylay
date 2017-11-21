const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// https://www.algolia.com/doc/tutorials/seo/generate-sitemap-from-index/javascript/

module.exports = {
  entry: './app/scripts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      favicon: 'favicon.ico'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'app.css'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 0,
      minRatio: 0.8,
      verbose: true
    }),
  ],
  resolve: {
    modules: [
      'node_modules',
      'app/scripts',
      'app/styles',
      'app/img',
      'app'
    ],
    extensions: ['.js', '.json', '.less', '.jade']
  },
  module: {
    loaders: [
      { test: /fbsdk/, loader: 'script-loader' },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpe?g|gif|png|woff|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              name: '[name].[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app', 'scripts')
      }
    ]
  }
};
