import React from 'react'
import ReactDOM from 'react-dom'
import path from 'path'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer as HotContainer } from 'react-hot-loader'

import { store, persistor } from 'configureStore'
import MainComponent from 'components/MainComponent'

require('styles/App.css')

console.log('hello from index.js')

const mainComponentPath = path.resolve('components', 'MainComponent')

injectTapEventPlugin()

const render = (Component, store, persistor) =>
  ReactDOM.render(
    <HotContainer>
      <Component store={store} persistor={persistor} />
    </HotContainer>,
  document.getElementById('siaApp')
)

render(MainComponent, store, persistor)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept(mainComponentPath, () => {
    render(MainComponent, store, persistor)
  })
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers/index.js', () => {
    const nextReducer = require('./reducers/index').default
    store.replaceReducer(nextReducer)
  })
}
