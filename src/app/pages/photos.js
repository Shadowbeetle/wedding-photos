import React, { Component } from 'react'
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

  render () {
    return (
      <div>
        {this.props.store.fetching ? 'Loading...' : 'Photos'}
        <div className="wedding-gallery-container">
          <div className="wedding-grid">
            {
              map(this.props.store.thumbnails, (thumbnail) => {
                const dimensions = normalizeDimensions(thumbnail.dimensions)
                const src = Api.getMediaObjectUrl('photos', thumbnail.key)
                return (
                  <div key={thumbnail.key} className="wedding-photo-placeholder" style={dimensions}>
                    <img height={dimensions.height} src={src}/>
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
