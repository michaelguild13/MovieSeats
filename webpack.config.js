const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app/index.tsx',
    server: './src/server.ts'
  },
  target:'node',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: __dirname,
        exclude: [
          /node_modules/,
          /\*.test.ts/
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};