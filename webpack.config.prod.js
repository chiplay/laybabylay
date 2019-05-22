const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      favicon: 'favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CompressionPlugin()
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
