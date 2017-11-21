const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/scripts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      favicon: 'favicon.ico'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
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
      { test: /fbsdk/, loader: 'script-loader' },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
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
