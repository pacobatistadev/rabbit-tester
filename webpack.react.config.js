const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser'],
    alias: {
      '@redux': path.resolve(__dirname, 'src/renderer/redux'),
      '@sections': path.resolve(__dirname, 'src/renderer/sections'),
    }
  },
  entry: ['babel-polyfill', './src/renderer/index.tsx'],
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: "/",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/public/index.html'
    }),
  ],
};