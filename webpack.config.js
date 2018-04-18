'use strict'

const path = require('path')
const args = require('minimist')(process.argv.slice(2))
console.log('Arguments ==> ', args)
// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test', 'localhost']

// Set the correct environment
let env
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test'
} else if (args.env) {
  env = args.env
} else {
  env = 'dev'
}
process.env.REACT_WEBPACK_ENV = env
console.log('process.env.REACT_WEBPACK_ENV ==> ', env)
console.log('now can we set process.env.NODE_ENV?')
if (env === 'dist') {
  process.env.NODE_ENV = 'dist'
  console.log('yes we can.  it is ==> ', process.env.NODE_ENV)
}
else {
  console.log('no, perhaps not.  sadness.')
}
console.log('here in webpack.config, process.env.NODE_ENV should be dist ==>', process.env.NODE_ENV)

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig (wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1
  let validEnv = isValid ? wantedEnv : 'dev'
  let config = require(path.resolve(__dirname, 'cfg/' + validEnv))
  return config
}

module.exports = buildConfig(env)
