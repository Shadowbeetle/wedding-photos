import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { map } from 'lodash'
import locale from '../texts/locale.json'
import Nav from '../components/nav'
import Api from '../util/api'

class Videos extends Component {
  constructor (props) {
    super(props)
    !this.props.store.videos.length && this.props.store.fetchMediaData('videos')

  }

  componentDidMount () {
    document.title = locale.videos[ this.props.lang ]
  }

  render () {
    const { lang, store } = this.props
    const { videos } = store
    return (
      <div>
        <Nav activePage="videos" lang={lang}/>
        {map(videos, (video) => {
          return (
            <video key={video.index} width="320" height="240" controls>
              <source src={Api.getMediaObjectUrl('videos', video.key)} type="video/mp4"/>
            </video>
          )
        })}
      </div>
    )
  }
}

export default observer(Videos)
