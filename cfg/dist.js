const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base')
const publicPath = '/assets/'
const siaRoot = process.env.REACT_WEBPACK_ROOT

const config = Object.assign({}, baseConfig, {
  cache: false,
  devtool: 'sourcemap',
  output: {
    path: path.resolve(siaRoot, 'dist', 'assets'),
    filename: '[name].js',
    publicPath: publicPath
  },
  resolve: {
    modules: [
      path.resolve(siaRoot, 'node_modules')
    ],
    alias: {
      cfg: path.resolve(siaRoot, 'cfg'),
      src: path.resolve(siaRoot, 'src'),
      actions: path.resolve(siaRoot, 'src', 'actions'),
      components: path.resolve(siaRoot, 'src', 'components'),
      config: path.resolve(siaRoot, 'src', 'config'),
      containers: path.resolve('src', 'containers'),
      extensionHooks: path.resolve('src', 'extensionHooks'),
      helpers: path.resolve(siaRoot, 'src', 'helpers'),
      reducers: path.resolve(siaRoot, 'src', 'reducers'),
      services: path.resolve(siaRoot, 'src', 'services'),
      static: path.resolve(siaRoot, 'src', 'static'),
      styles: path.resolve(siaRoot, 'src', 'styles'),
      configureStore: path.resolve(siaRoot, 'src', 'configureStore'),
      appInsights: path.resolve(siaRoot, 'src', 'appInsights.js')
    }
  },
  resolveLoader: {
    modules: [
      path.resolve(siaRoot, 'node_modules')
    ]
  }
})

config.entry.app.push(path.resolve(siaRoot, 'src', 'index'))

config.plugins.push(...[
  new UglifyJSPlugin({ sourceMap: true }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
])

module.exports = config
