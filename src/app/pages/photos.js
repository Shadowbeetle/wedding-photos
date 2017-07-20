import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import { observer } from 'mobx-react'
import { map } from 'lodash'
import locale from '../texts/locale.json'
import Api from '../util/api'
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
    this.lang = this.props.lang
    this.props.store.fetchMediaData('photos')
  }

  componentDidMount () {
    document.title = locale.photos[ this.props.lang ]
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
    const nextImage = thumbnails[(image.index + 1) % thumbnails.length]
    const nextSrc = Api.getMediaObjectUrl('photos', nextImage.largeKey)
    const prevImage = thumbnails[(image.index + thumbnails.length - 1) % thumbnails.length]
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

  render () {
    return (
      <div>
        {this.props.store.fetching ? 'Loading...' : 'Photos'}
        {this.renderLightbox()}
        <div className="wedding-gallery-container">
          <div className="wedding-grid">
            {
              map(this.props.store.thumbnails, (thumbnail) => {
                const dimensions = normalizeDimensions(thumbnail.dimensions)
                const src = Api.getMediaObjectUrl('photos', thumbnail.key)
                return (
                  <div key={thumbnail.index} className="wedding-photo-placeholder" style={dimensions}>
                    <img onClick={this.handlePhotoClick(thumbnail)}
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
