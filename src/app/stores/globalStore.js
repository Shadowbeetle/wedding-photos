import { observable, extendObservable, runInAction } from 'mobx'
import Api from '../util/api'

class Store {
  constructor () {
    extendObservable(this, {
      thumbnails: observable.array(),
      fetching: false,
      isLightboxOpen: false,
      lightboxImage: {},
      videos: observable.array(),
      shouldDownloadPhotoBundle: false,
      shouldDownloadVideo: false,
      videoToDownload: '',
      checkedExistenceOf: {
        photos: false,
        videos: false
      }
    })
  }

  fetchMediaData (type) {
    let done = false
    setTimeout(() => {
      this.fetching = !done
    }, 200)

    Api.getMediaData(type)
      .then((resp) => {
        if (type === 'photos') {
          this.thumbnails = observable(resp.data)
        } else {
          this.videos = observable(resp.data)
        }
        this.fetching = false
        this.checkedExistenceOf[type] = true
        done = true
      })
      .catch(err => {
        done = true
        this.fetching = false
        this.checkedExistenceOf[type] = true
        done = true
        console.error(err)
      })
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
