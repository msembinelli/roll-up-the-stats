import { resolve } from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import failPlugin from 'webpack-fail-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'


export default {
  devtool: 'source-map',

  entry: [ './app' ],

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      resolve('./app'),
      "node_modules"
    ],
  },

  output: {
    path: resolve(__dirname, '..', 'dist'),
    filename: 'bundle.[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: '/tmp',
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&camelCase&sourceMap&localIdentName=[name]_[local]', 'sass-loader'),
      },
      { test: /\.(png|gif|ttf|eot|svg|woff|woff2?)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          emitError: true,
          failOnError: true,
          configFile: '.eslintrc',
          fix: false,
        },
      },
    ],
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    failPlugin,
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new ExtractTextPlugin({ allChunks: true, filename: 'style.[chunkhash].css' }),
    new CopyWebpackPlugin([
      {
        context: 'assets',
        from: '**/*',
        to: resolve(__dirname, '..', 'dist'),
      },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}
