import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import Nav from '../components/nav'
import Api from '../util/api'
import VideoGallery from '../components/videoGallery'
import Subscribe from '../components/subscribe'
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
        {
          store.videos.length
          ? <VideoGallery lang={lang} download={this.download} videos={store.videos}/>
          : <Subscribe lang={lang} target="videos"/>
        }
      </div>
    )
  }
}

export default observer(Videos)
