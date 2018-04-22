const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base')
const siaRoot = path.resolve(__dirname, '..')
console.log('hello from dist.js')

const config = Object.assign({}, baseConfig, {
  mode: 'production',
  context: siaRoot,
  cache: false,
  devtool: 'sourcemap',
  resolve: {
    modules: [
      siaRoot,
      path.resolve(siaRoot, 'src'),
      path.resolve(siaRoot, 'node_modules')
    ]
  //   alias: {
  //     cfg: path.resolve(siaRoot, 'cfg'),
  //     src: path.resolve(siaRoot, 'src'),
  //     actions: path.resolve(siaRoot, 'src', 'actions'),
  //     components: path.resolve(siaRoot, 'src', 'components'),
  //     config: path.resolve(siaRoot, 'src', 'config'),
  //     containers: path.resolve('src', 'containers'),
  //     extensionHooks: path.resolve('src', 'extensionHooks'),
  //     helpers: path.resolve(siaRoot, 'src', 'helpers'),
  //     reducers: path.resolve(siaRoot, 'src', 'reducers'),
  //     services: path.resolve(siaRoot, 'src', 'services'),
  //     static: path.resolve(siaRoot, 'src', 'static'),
  //     styles: path.resolve(siaRoot, 'src', 'styles'),
  //     configureStore: path.resolve(siaRoot, 'src', 'configureStore'),
  //     appInsights: path.resolve(siaRoot, 'src', 'appInsights.js')
  //   }
  },
  resolveLoader: {
    modules: [
      path.resolve(siaRoot, 'node_modules')
    ]
  }
})

config.entry.app.push(path.resolve(siaRoot, 'src', 'index'))
config.plugins.push(...[
  new webpack.optimize.AggressiveMergingPlugin()
])

console.log('dist.js config.entry ==> ', config.entry)
console.log('dist.js config.output ==> ', config.output)
module.exports = config
