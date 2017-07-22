import React, { Component } from 'react'
import page from 'page'
import PropTypes from 'prop-types'
import './langFlag.css'

import enFlag from '../../assets/img/en.svg'
import huFlag from '../../assets/img/hu.svg'

class LangFlag extends Component {
  getAltText () {
    return this.props.targetLang === 'hu'
      ? 'Válts magyar nyelvre'
      : 'Switch to English'
  }

  handleClick = (evt) => {
    evt.preventDefault()
    page(`${window.location.pathname}?lang=${this.props.targetLang}`)
  }

  render () {
    const { targetLang: lang } = this.props
    return (
      <li>
        <a onClick={this.handleClick} href={`?lang=${lang}`}>
          <img alt={this.getAltText()} className="wedding-language-flag" src={lang === 'hu' ? huFlag : enFlag}/>
          <span>{lang}</span>
        </a>
      </li>
    )
  }
}

LangFlag.propTypes = {
  targetLang: PropTypes.oneOf([ 'hu', 'en' ]).isRequired,
}

export default LangFlag
