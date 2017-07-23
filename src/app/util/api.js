import axios from 'axios'
const Api = {}

const isProd = process.env.NODE_ENV === 'production'
const baseUrl = isProd ? '' : 'http://localhost:8888'
Api.getMediaData = function (type) {
  return axios.get(`${baseUrl}/api/media/${type}`)
}

Api.getMediaObjectUrl = function (type, key) {
  return `${baseUrl}/api/media/${type}/${encodeURIComponent(key)}`
}

Api.getPhotoBundleUrl = function () {
  return `${baseUrl}/api/media/photos/photo-bundle`
}
export default Api
