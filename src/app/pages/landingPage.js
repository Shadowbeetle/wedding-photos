import React, { Component } from 'react'
import page from 'page'
import locale from '../texts/locale.json'

class LandingPage extends Component {
  constructor (props) {
    super(props)
    this.lang = this.props.lang
  }
  componentDidMount () {
    document.title = locale.title[this.props.lang]
  }

  navigate = (evt) => {
    page(`/${evt.target.name}`)
    evt.preventDefault()
  }

  render () {
    return (
      <div>
        <ul>
          <li><a onClick={this.navigate} href="/photos" name="photos">{locale.photos[this.lang]}</a></li>
          <li><a onClick={this.navigate} href="/videos" name="videos">{locale.videos[this.lang]}</a></li>
        </ul>
      </div>
    )
  }
}

export default LandingPage
