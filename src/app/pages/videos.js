import React, { Component } from 'react'
import locale from '../texts/locale.json'
import Nav from '../components/nav'

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
        <Nav activePage="videos" lang={this.props.lang}/>
        Videos
      </div>
    )
  }
}

export default Photos
