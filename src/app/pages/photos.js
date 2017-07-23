import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import { observer } from 'mobx-react'
import { map } from 'lodash'
import locale from '../texts/locale.json'
import Api from '../util/api'
import Nav from '../components/nav'
import LoadingSpinner from '../components/loadingSpinner'
import './photos.css'

function normalizeDimensions ({ width, height }) {
  const normalizedHeight = 250
  return {
    width: (normalizedHeight * width) / height,
    height: normalizedHeight
  }
}

class Photos extends Component {
  constructor (props) {
    super(props)
    document.title = locale.photos[ props.lang ]
    props.store.shouldDownloadPhotoBundle = false
    !props.store.thumbnails.length && props.store.fetchMediaData('photos')
  }

  handlePhotoClick = (thumbnail) => (evt) => {
    this.props.store.openLightbox(thumbnail)
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
    }, 500)
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
        <div>
          <button onClick={this.download} className="btn btn-default">{locale.downloadAll[ lang ]}</button>
        </div>
        <div className="wedding-gallery-container">
          <div className="wedding-grid">
            {
              map(store.thumbnails, (thumbnail) => {
                const dimensions = normalizeDimensions(thumbnail.dimensions)
                const src = Api.getMediaObjectUrl('photos', thumbnail.key)
                return (
                  <div key={thumbnail.index} className="wedding-photo-placeholder" style={dimensions}>
                    <img onClick={this.handlePhotoClick(thumbnail)}
                         alt=""
                         className="wedding-photo"
                         height={dimensions.height}
                         src={src}/>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default observer(Photos)
