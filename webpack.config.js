module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    server: './src/server.js'
  },
  target:'node',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};