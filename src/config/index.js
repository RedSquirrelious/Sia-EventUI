import path from 'path'
let config
const defaultConstPath = path.join(process.env.REACT_WEBPACK_ROOT, 'cfg', 'defaultConstants')
if (typeof constants !== 'undefined') {
  // The global 'constants' is being defined by Webpack in /cfg/[dev|dist|test|localhost].js
  // eslint-disable-next-line no-undef
  config = constants
} else {
  const defaultConstants = require(defaultConstPath)
  config = defaultConstants.default || defaultConstants
}

export default config
