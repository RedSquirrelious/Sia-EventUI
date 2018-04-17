const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base')
const siaRoot = path.resolve(__dirname, '..')
console.log('hello from dist.js')

console.log('dist.js siaRoot ==> ', siaRoot)
console.log('dist.js baseConfig ==> ', baseConfig)
const config = Object.assign({}, baseConfig, {
  cache: false,
  devtool: 'sourcemap',
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

console.log('in dist.js, config.entry.app ==> ', config.entry.app)
config.entry.app.push(path.resolve(siaRoot, 'src', 'index'))
console.log('in dist.js, config.entry.app, now with src/index ==> ', config.entry.app)
config.plugins.push(...[
  new UglifyJSPlugin({ sourceMap: true }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
])

console.log('dist.js config ==> ', config)
module.exports = config
