var webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/app.js',
    vendor: ['three']
  },
  output: {
    filename: '[name].bundle.js',
    path: './dist/js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
}
