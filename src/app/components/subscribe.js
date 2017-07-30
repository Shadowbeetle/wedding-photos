import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import locale from '../texts/locale'
import './subscribe.css'

export default class Subscribe extends Component {
  render () {
    const { target, lang } = this.props
    const missingItems = _.camelCase(`no-${target}`)
    return (
      <div className="wedding-subscribe-container">
        <h1>{locale[missingItems][lang]}</h1>
        <p>{locale.subscribe[lang]}</p>
        <input placeholder="Email" type="email"/>
      </div>
    )
  }
}

Subscribe.propTypes = {
  target: PropTypes.oneOf(['photos', 'videos']),
  lang: PropTypes.oneOf(['en', 'hu'])
}
