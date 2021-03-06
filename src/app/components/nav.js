import React, { Component } from 'react'
import page from 'page'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import locale from '../texts/locale'
import LangFlag from './langFlag'
import './nav.css'
import logo from '../../assets/img/logo.svg'

class Nav extends Component {
  navigate = (evt) => {
    evt.preventDefault()
    page(`/guest/${this.props.guestId}/${evt.target.name}${window.location.search}`)
  }

  render () {
    const { activePage, lang, guestId } = this.props
    return (
      <nav className="navbar navbar-default navbar-fixed-top navbar-toggleable-md wedding-navbar">
        <div className="container">
          <div className="navbar-header">
            <button id="navbar-toggle-button" type="button" className="navbar-toggle" data-toggle="collapse"
                    data-target="#navbar-content">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand wedding-brand-logo" href={`?lang=${lang}#`}>
              <img alt="logo" src={logo} className="wedding-logo"/>
            </a>
            <a className="navbar-brand wedding-brand-text" href={`?lang=${lang}#`}>
              <span>{locale.title[ lang ]}</span>
            </a>
          </div>
          <div className="collapse navbar-collapse" id="navbar-content">
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item">
                <a className={classNames('nav-link wedding-navigate', { 'active': activePage === 'photos' })}
                   onClick={this.navigate}
                   href={`/guest/${guestId}/photos${window.location.search}`}
                   name="photos">
                  {locale.photos[ lang ]}
                </a>
              </li>
              <li className="nav-item">
                <a className={classNames('nav-link wedding-navigate', { 'active': activePage === 'videos' })}
                   onClick={this.navigate}
                   href={`/guest/${guestId}/videos${window.location.search}`}
                   name="videos">
                  {locale.videos[ lang ]}
                </a>
              </li>
              <LangFlag targetLang={lang === 'hu' ? 'en' : 'hu'}/>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  lang: PropTypes.oneOf([ 'hu', 'en' ]).isRequired,
  activePage: PropTypes.oneOf([ 'photos', 'videos' ]).isRequired,
  guestId: PropTypes.string.isRequired
}

export default Nav
