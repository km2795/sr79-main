const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

// --- 1. Client Configuration ---
const clientConfig = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'swish', "client", 'ui', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "src", "swish", "dist"),
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
      template: path.join(__dirname, "src", "swish", "client", "public", "index.html"),
      filename: "index.html"
    }),
    // copy static files (index.html, raw assets that are not imported)
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'swish', "client", 'public', 'images'),
          to: path.join(__dirname, "src", "swish", "dist", "public", "images")
        }
      ]
    })
  ]
}

// --- 2. Server Configuration ---
const serverConfig = {
  mode: "production",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js"
  },
  target: "node",
  externals: [nodeExternals()], // Exclude node_modules from the bundle.
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devtool: "source-map",
}

module.exports = [clientConfig, serverConfig];
