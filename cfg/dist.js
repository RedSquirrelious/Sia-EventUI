const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base')

const config = Object.assign({}, baseConfig, {
  cache: false,
  devtool: 'sourcemap',
  resolve: {
    modules: [
      path.resolve(__dirname, '..', 'node_modules')
    ],
    alias: {
      src: path.resolve(__dirname, '..', 'src'),
      actions: path.resolve(__dirname, '..', 'src', 'actions'),
      components: path.resolve(__dirname, '..', 'src', 'components'),
      config: path.resolve(__dirname, '..', 'src', 'config'),
      containers: path.resolve(__dirname, '..', 'src', 'containers'),
      extensionHooks: path.resolve(__dirname, '..', 'src', 'extensionHooks'),
      helpers: path.resolve(__dirname, '..', 'src', 'helpers'),
      reducers: path.resolve(__dirname, '..', 'src', 'reducers'),
      services: path.resolve(__dirname, '..', 'src', 'services'),
      static: path.resolve(__dirname, '..', 'src', 'static'),
      styles: path.resolve(__dirname, '..', 'src', 'styles'),
      configureStore: path.resolve(__dirname, '..', 'src', 'configureStore')
    }
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, '..', 'node_modules')
    ]
  }
})

config.entry.app.push(__dirname, '..', 'src', 'index')

config.plugins.push(...[
  new UglifyJSPlugin({ sourceMap: true }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
])

module.exports = config
