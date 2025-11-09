const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'swish', 'ui', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "src", 'dist'),
    publicPath: '/swish/' // <-- critical: emitted asset URLs will be prefixed with /swish/
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' } // or your ts/js loader
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "swish", "public", "index.html"),
      filename: "index.html"
    }),
    // copy static files (index.html, raw assets that are not imported)
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'swish', 'public', 'images'),
          to: path.join(__dirname, "src", "dist", "public", "images")
        }
      ]
    })
  ],
  mode: 'production'
};
