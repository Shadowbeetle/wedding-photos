import React, { Component } from 'react'
import locale from '../texts/locale.json'

class Photos extends Component {
  constructor (props) {
    super(props)
    this.lang = this.props.lang
  }
  componentDidMount () {
    document.title = locale.videos[this.props.lang]
  }

  render () {
    return (
      <div>
        Videos
      </div>
    )
  }
}

export default Photos
