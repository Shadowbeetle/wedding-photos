import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import { map } from 'lodash'
import locale from '../texts/locale.json'
import Nav from '../components/nav'
import Api from '../util/api'
import './videos.css'

class Videos extends Component {
  constructor (props) {
    super(props)
    this.props.store.shouldDownloadVideo = false
    !props.store.videos.length && props.store.fetchMediaData('videos')
  }

  download = action((evt) => {
    this.props.store.shouldDownloadVideo = true
    this.props.store.videoToDownload = evt.target.name
    setTimeout(() => {
      this.props.store.shouldDownloadVideo = false
    }, 5000)
  })

  setupDownload () {
    const { shouldDownloadVideo, videoToDownload } = this.props.store
    return shouldDownloadVideo
      ? <iframe title="download"
                src={Api.getMediaObjectUrl('videos', videoToDownload)}
                style={{ visibility: 'hidden', display: 'none' }}/>
      : null
  }

  render () {
    const { lang, store } = this.props

    return (
      <div>
        <Nav activePage="videos" lang={lang}/>
        {this.setupDownload()}
        <div className="wedding-video-page-container container">
          {map(store.videos, ({ aws: videoKey, youtube: youtubeId }) => {
            return (
              <div className="wedding-video-item-container" key={videoKey}>
                <div className="wedding-video-container">
                  <iframe width="480" height="270" src={`https://www.youtube.com/embed/${youtubeId}`} frameBorder="0"
                        allowFullScreen title={videoKey}/>
                </div>
                <div className="wedding-video-download-button-container">
                  <button name={videoKey} className="btn btn-default" onClick={this.download}>
                    {locale.download[ lang ]}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default observer(Videos)
