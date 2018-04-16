'use strict'

const path = require('path')
const args = require('minimist')(process.argv.slice(2))

// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test', 'localhost']

// Set the correct environment
let env
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test'
} else if (args.env.env) {
  env = args.env.env
} else {
  env = 'dev'
}
process.env.REACT_WEBPACK_ENV = env
let root
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  root = __dirname
} else if (args.env.root) {
  root = args.env.root
} else {
  root = __dirname
}
process.env.REACT_WEBPACK_ROOT = root


let defaultConstantsPath
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  defaultConstantsPath = 'cfg/defaultConstants'
} else if (args.env.defaultConstants) {
  defaultConstantsPath = args.env.defaultConstants
} else {
  defaultConstantsPath = 'cfg/defaultConstants'
}
process.env.REACT_WEBPACK_DEFAULT_CONSTANTS = defaultConstantsPath

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig (wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1
  let validEnv = isValid ? wantedEnv : 'dev'
  let config = require(path.join(__dirname, 'cfg/' + validEnv))
  return config
}

module.exports = buildConfig(env)
