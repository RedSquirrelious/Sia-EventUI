const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base')
const siaRoot = path.join(__dirname, '..')

const config = Object.assign({}, baseConfig, {
  mode: 'production',
  cache: false,
  devtool: 'sourcemap',
  optimization: {
    minimizer: [new UglifyJSPlugin({ sourceMap: true })]
  },
  resolve: {
    modules: [
      path.resolve(siaRoot, 'node_modules')
    ]
  },
  resolveLoader: {
    modules: [
      path.join(siaRoot, 'node_modules')
    ]
  }
})

config.entry.app.push(path.join(siaRoot, 'src', 'index'))

config.plugins.push(...[
  new webpack.optimize.AggressiveMergingPlugin()
])

module.exports = config
