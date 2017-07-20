import React, { Component } from 'react'
import './app.css'
import router from './router'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      component: this.props.children ? this.props.children : ""
    }
  }

  componentDidMount() {
    //Do routing, once AppHandler mounts
    router(this)
  }

  render () {
    return <div>{this.state.component}</div>
  }
}

export default App
