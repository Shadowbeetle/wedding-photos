import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import _ from 'lodash'
import locale from '../texts/locale'

class VideoGallery extends Component {
  render () {
    return (
      <div className="wedding-video-page-container container">
        {_.map(this.props.videos, ({ aws: videoKey, youtube: youtubeId }) => {
          return (
            <div className="wedding-video-item-container" key={videoKey}>
              <div className="wedding-video-container">
                <iframe width="480" height="270" src={`https://www.youtube.com/embed/${youtubeId}`} frameBorder="0"
                        allowFullScreen title={videoKey}/>
              </div>
              <div className="wedding-video-download-button-container">
                <button name={videoKey} className="btn btn-default" onClick={this.props.download}>
                  {locale.download[ this.props.lang ]}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

VideoGallery.propTypes = {
  videos: PropTypes.objectOf(PropTypes.shape({
    aws: PropTypes.string.isRequired,
    youtube: PropTypes.string.isRequired
  })),
  download: PropTypes.func.isRequired,
  lang: PropTypes.oneOf(['en', 'hu']).isRequired
}

export default observer(VideoGallery)



