var path                = require('path'),
    webpack             = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
   './app/scripts'
  ],
  watch: true,
  progress : true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, 'wp-content', 'themes', 'lbl', 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER     : JSON.stringify(true),
        NODE_ENV    : JSON.stringify('development')
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
      { test: /\.less$/, loader: 'style!css!less' },
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


// var webpack = require('webpack');
// var path = require('path');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');

// module.exports = {
//   devServer: {
//     historyApiFallback: true,
//     hot: true,
//     inline: true,
//     progress: true,
//     contentBase: './app',
//     port: 8080
//   },
//   entry: [
//     'webpack/hot/dev-server',
//     'webpack-dev-server/client?http://localhost:8080',
//     path.resolve(__dirname, 'app/scripts/main.js')
//   ],
//   output: {
//     path: __dirname + '/wp-content/themes/lbl/assets',
//     publicPath: '/wp-content/themes/lbl/assets',
//     filename: './bundle.js'
//   },
//   module: {
//     loaders:[
//       { test: /\.less$/, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader!less-loader' },
//       { test: /\.css$/, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader' },
//       { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
//     ]
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new OpenBrowserPlugin({ url: 'http://localhost:8080' })
//   ]
// };