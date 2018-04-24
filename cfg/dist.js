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
    ],
  //   alias: {
  //     src: path.join(siaRoot, 'src'),
  //     actions: path.join(siaRoot, 'src', 'actions'),
  //     components: path.join(siaRoot, 'src', 'components'),
  //     config: path.join(siaRoot, 'src', 'config'),
  //     containers: path.join(siaRoot, 'src', 'containers'),
  //     extensionHooks: path.join(siaRoot, 'src', 'extensionHooks'),
  //     helpers: path.join(siaRoot, 'src', 'helpers'),
  //     reducers: path.join(siaRoot, 'src', 'reducers'),
  //     services: path.join(siaRoot, 'src', 'services'),
  //     static: path.join(siaRoot, 'src', 'static'),
  //     styles: path.join(siaRoot, 'src', 'styles'),
  //     configureStore: path.join(siaRoot, 'src', 'configureStore')
  //   }
  // },
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
