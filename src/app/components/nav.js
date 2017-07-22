import React, { Component } from 'react'
import page from 'page'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import locale from '../texts/locale.json'
import './nav.css'

class Nav extends Component {
  navigate = (evt) => {
    page(`/${evt.target.name}`)
    evt.preventDefault()
  }

  render () {
    const { activePage, lang } = this.props
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a className={classNames('nav-link', { 'active': activePage === 'photos' })}
               data-toggle="tab"
               onClick={this.navigate}
               href="/photos"
               name="photos">
              {locale.photos[ lang ]}
            </a>
          </li>
          <li className="nav-item">
            <a className={classNames('nav-link', { 'active': activePage === 'videos' })}
               data-toggle="tab"
               onClick={this.navigate}
               href="/videos"
               name="videos">
              {locale.videos[ lang ]}
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

Nav.propTypes = {
  lang: PropTypes.string.isRequired,
  activePage: PropTypes.oneOf([ 'photos', 'videos' ]).isRequired
}

export default Nav
