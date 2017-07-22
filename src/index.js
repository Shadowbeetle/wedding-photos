import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
if (!window.history) {
  require('html5-history-api')
}

ReactDOM.render(<App/>, document.getElementById('root'))
