const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

// https://www.algolia.com/doc/tutorials/seo/generate-sitemap-from-index/javascript/

module.exports = {
  mode: 'production',
  entry: {
    main: './app/scripts/index.js',
    client: './app/scripts/client.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true
    })
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
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.ico$/i,
        loader: 'file-loader?name=[name].[ext]'
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
            loader: 'image-webpack-loader',
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
