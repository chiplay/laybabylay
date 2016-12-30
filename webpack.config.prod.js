var path                = require('path'),
    webpack             = require('webpack'),
    ExtractTextPlugin   = require('extract-text-webpack-plugin'),
    nodeModulesPath     = path.join(__dirname, 'node_modules');

module.exports = {
  entry: ['./app/scripts'],
  output: {
    path: path.join(__dirname, 'wp-content', 'themes', 'lbl', 'dist'),
    filename: 'app.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER     : JSON.stringify(true),
        NODE_ENV    : JSON.stringify('production')
      }
    })
  ],
  resolve: {
    modulesDirectories: [
      'node_modules',
      'app/scripts',
      'app/styles',
      'app/img',
      'app'
    ],
    extensions: ['', '.js', '.json', '.less', '.jade']
  },
  module: {
    loaders: [
      { test: /fbsdk/, loader: 'script' },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.(jpe?g|gif|png|woff|svg)$/i,
        loaders: [
          'url?limit=50000&name=[name].[hash].[ext]',
          'image-webpack?bypassOnDebug'
        ]
      },
      {
        test: /\.jade$/,
        loaders: [
          'html?attrs[]=img:src&attrs[]=source:src&minimize=false',
          'jade-html'
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'app', 'scripts')
      }
    ]
  }
};