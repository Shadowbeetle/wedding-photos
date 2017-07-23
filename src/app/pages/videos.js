import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import { map } from 'lodash'
import locale from '../texts/locale.json'
import Nav from '../components/nav'
import Api from '../util/api'
import './videos.css'

const videoNamesToYoutube = new Map([
  [ 'professional/videos/VID_20140728_164537.mp4', 'ywzIK6Yji7c' ],
  [ 'professional/videos/VID_20170317_141720.mp4', 'fqZppJU6jlA' ]
])

class Videos extends Component {
  constructor (props) {
    super(props)
    this.props.store.shouldDownloadVideo = false
  }

  download = action((evt) => {
    this.props.store.shouldDownloadVideo = true
    this.props.store.videoToDownload = evt.target.name
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
    const { lang } = this.props

    return (
      <div>
        <Nav activePage="videos" lang={lang}/>
        {this.setupDownload()}
        <div className="wedding-video-page-container container">
          {map([ ...videoNamesToYoutube.entries() ], ([ videoKey, youtubeId ]) => {
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
