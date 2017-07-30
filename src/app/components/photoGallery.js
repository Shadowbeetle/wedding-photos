import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import _ from 'lodash'
import locale from '../texts/locale.json'
import Api from '../util/api'

function normalizeDimensions ({ width, height }) {
  const normalizedHeight = 250
  return {
    width: (normalizedHeight * width) / height,
    height: normalizedHeight
  }
}

class PhotoGallery extends Component {
  handlePhotoClick = (thumbnail) => (evt) => {
    this.props.openLightbox(thumbnail)
  }

  render () {
    return (
      <div className="wedding-photo-page-container container">
        {this.props.thumbnails.length
          ? (
            <div className="wedding-photo-download-button-container">
              <button onClick={this.props.download} className="btn btn-default">{locale.downloadAll[ this.props.lang ]}</button>
            </div>
          )
          : null
        }
        <div className="wedding-gallery-container">
          <div className="wedding-grid">
            {
              _.map(this.props.thumbnails, (thumbnail) => {
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

PhotoGallery.propTypes = {
  thumbnails: PropTypes.arrayOf(PropTypes.shape({
    dimensions: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired
    }).isRequired,
    youtube: PropTypes.string.isRequired
  })),
  download: PropTypes.func.isRequired,
  lang: PropTypes.oneOf(['en', 'hu']).isRequired,
  openLightbox: PropTypes.func.isRequired
}

export default observer(PhotoGallery)



