import { observable, extendObservable, runInAction, action } from 'mobx'
import Api from '../util/api'
import _ from 'lodash'

class Store {
  constructor () {
    extendObservable(this, {
      thumbnails: observable.array(),
      fetching: false,
      authorizing: false,
      isLightboxOpen: false,
      lightboxImage: {},
      videos: observable.array(),
      shouldDownloadPhotoBundle: false,
      shouldDownloadVideo: false,
      videoToDownload: '',
      checkedExistenceOf: {
        photos: false,
        videos: false
      },
      isUnauthorized: true,
      guestId: ''
    })
  }

  fetchMediaData (type) {
    let done = false
    setTimeout(() => {
      this.fetching = !done
    }, 200)

    return Api.getMediaData(type, this.guestId)
      .then(action((resp) => {
        if (type === 'photos') {
          this.thumbnails = observable(resp.data)
        } else {
          this.videos = observable(resp.data)
        }
        this.fetching = false
        this.checkedExistenceOf[type] = true
        done = true
      }))
      .catch(action(err => {
        done = true
        this.fetching = false
        this.checkedExistenceOf[type] = true
        done = true
        console.error(err)
      }))
  }

  fetchUser (id) {
    this.authorizing = true
    return Api.getGuest(id)
      .then(action(() => {
        this.isUnauthorized = false
        this.guestId = id
        this.authorizing = false
        localStorage.setItem('guestId', id)
      }))
      .catch(action((err) => {
        if (_.get(err, 'response.status') === 403) {
          throw err
        } else {
          console.error(err)
        }
      }))
  }

  openLightbox = (thumbnail) => {
    runInAction (() => {
      this.isLightboxOpen = true
      this.lightboxImage = thumbnail
    })
  }

  closeLightbox = () => {
    this.isLightboxOpen = false
  }

  showPrevLightboxImage = () => {
    this.lightboxImage = this.thumbnails[(this.lightboxImage.index + this.thumbnails.length - 1) % this.thumbnails.length]
  }

  showNextLightboxImage = () => {
    this.lightboxImage = this.thumbnails[(this.lightboxImage.index + 1) % this.thumbnails.length]
  }
}

const globalStore = new Store()
export { globalStore }
