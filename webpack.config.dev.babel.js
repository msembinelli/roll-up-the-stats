import { join, resolve } from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import GlobalizePlugin from 'react-globalize-webpack-plugin'


export default {
  devtool: 'cheap-module-source-map',

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8000',
    './app',
  ],

  output: {
    path: join(__dirname, 'assets'),
    publicPath: '',
    filename: 'dev-bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader',
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: '/tmp',
        },
      },
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.scss$/,
        loader: [ 'style-loader', 'css-loader?modules&camelCase&sourceMap&localIdentName=[name]_[local]', 'sass-loader' ],
      },
      {
        test: /\.(png|gif|ttf|eot|svg|woff|woff2?)$/,
        loader: 'url-loader?name=[name].[ext]'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          configFile: '.eslintrc',
          fix: true,
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      resolve(__dirname, './app'),
      "node_modules"
    ],
  },

  devServer: {
    hot: true,
    inline: true,
    progress: true,
    historyApiFallback: true,
    contentBase: './assets',
    host: '0.0.0.0',
    port: '8000',
    watchOptions: process.env.DOCKER_MAC_BETA
      ? {}
      : { aggregateTimeout: 300, poll: 1000 },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new GlobalizePlugin({
			production: false,
			developmentLocale: "en",
			supportedLocales: [ "en" ],
			messages: "messages/[locale].json",
			output: "i18n/[locale].[hash].js"
		})
  ],
}
