import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import { observer } from 'mobx-react'
import locale from '../texts/locale.json'
import Api from '../util/api'
import Nav from '../components/nav'
import LoadingSpinner from '../components/loadingSpinner'
import PhotoGallery from '../components/photoGallery'
import './photos.css'

class Photos extends Component {
  constructor (props) {
    super(props)
    document.title = locale.photos[ props.lang ]
    props.store.shouldDownloadPhotoBundle = false
    !props.store.thumbnails.length && props.store.fetchMediaData('photos')
  }

  renderLightbox = () => {
    if (!this.props.store.isLightboxOpen) return
    const { store } = this.props
    const image = store.lightboxImage
    const thumbnails = store.thumbnails
    const mainSrc = Api.getMediaObjectUrl('photos', image.largeKey)
    const nextImage = thumbnails[ (image.index + 1) % thumbnails.length ]
    const nextSrc = Api.getMediaObjectUrl('photos', nextImage.largeKey)
    const prevImage = thumbnails[ (image.index + thumbnails.length - 1) % thumbnails.length ]
    const prevSrc = Api.getMediaObjectUrl('photos', prevImage.largeKey)
    return (
      <Lightbox
        mainSrc={mainSrc}
        nextSrc={nextSrc}
        prevSrc={prevSrc}

        onCloseRequest={store.closeLightbox}
        onMovePrevRequest={store.showPrevLightboxImage}
        onMoveNextRequest={store.showNextLightboxImage}
      />
    )
  }

  download = (evt) => {
    this.props.store.shouldDownloadPhotoBundle = true
    setTimeout(() => {
      this.props.store.shouldDownloadPhotoBundle = false
    }, 5000)
  }

  setupDownload () {
    const { shouldDownloadPhotoBundle } = this.props.store
    return shouldDownloadPhotoBundle
      ? <iframe title="download"
                src={Api.getPhotoBundleUrl()}
                style={{ visibility: 'hidden', display: 'none' }}/>
      : null
  }

  render () {
    const { lang, store } = this.props
    return (
      <div className="container">
        <Nav activePage="photos" lang={lang}/>
        {this.setupDownload()}
        {store.fetching ? <LoadingSpinner/> : null}
        {this.renderLightbox()}
        {store.thumbnails.length
          ? <PhotoGallery openLightbox={this.props.store.openLightbox} l
                          lang={lang}
                          download={this.download}
                          thumbnails={store.thumbnails}/>
          : null
        }
      </div>
    )
  }
}

export default observer(Photos)
