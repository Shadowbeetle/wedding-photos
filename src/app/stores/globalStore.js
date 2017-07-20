import { observable, extendObservable } from 'mobx'
import Api from '../util/api'

class Store {
  constructor () {
    extendObservable(this, {
      thumbnails: observable.array(),
      fetching: false
    })
  }

  fetchMediaData (type) {
    this.fetching = true
    Api.getMediaData(type)
      .then((resp) => {
        this.thumbnails = observable(resp.data)
        this.fetching = false
      })
      .catch(err => {
        this.fetching = false
        console.error(err)
      })
  }
}

const globalStore = new Store()
export { globalStore }
