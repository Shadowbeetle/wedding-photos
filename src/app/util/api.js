import axios from 'axios'
const Api = {}

Api.getMediaData = function (type) {
  return axios.get(`/api/media/${type}`)
}

Api.getMediaObjectUrl = function (type, key) {
  return `/api/media/${type}/${encodeURIComponent(key)}`
}
export default Api
