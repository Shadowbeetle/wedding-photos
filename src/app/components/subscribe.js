import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import locale from '../texts/locale'
import './subscribe.css'

export default class Subscribe extends Component {
  componentDidMount () {
    this.emailInput.focus()
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.handleSubmit(this.emailInput.value)
      .then(() => alert(locale.emailSentSuccessfully[this.props.lang]))
      .catch((err) => alert(locale.emailSendFailed[this.props.lang]))
  }

  render () {
    const { target, lang } = this.props
    const missingItems = _.camelCase(`no-${target}`)
    return (
      <form className="wedding-subscribe-container" onSubmit={this.handleSubmit}>
        <h1>{locale[ missingItems ][ lang ]}</h1>
        <p>{locale.subscribe[ lang ]}</p>
        <input ref={(input) => { this.emailInput = input; }}
               autoFocus={true}
               placeholder="Email" type="email" className="form-control wedding-email-input"/>
        <button type="submit" className="btn btn-default wedding-submit-button">{locale.submit[ lang ]}</button>
      </form>
    )
  }
}

Subscribe.propTypes = {
  target: PropTypes.oneOf([ 'photos', 'videos' ]),
  lang: PropTypes.oneOf([ 'en', 'hu' ]),
  handleSubmit: PropTypes.func.isRequired
}
