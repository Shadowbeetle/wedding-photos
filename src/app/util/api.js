import axios from 'axios'
import {baseUrl} from './consts'
const Api = {}

Api.getMediaData = function (type) {
  return axios.get(`${baseUrl}/api/media/${type}`)
}

Api.getMediaObjectUrl = function (type, key) {
  return `${baseUrl}/api/media/${type}/${encodeURIComponent(key)}`
}
export default Api
