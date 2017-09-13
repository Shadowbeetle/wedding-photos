import axios from 'axios'
const Api = {}

const isProd = process.env.NODE_ENV === 'production'
const baseUrl = isProd ? '' : 'http://localhost:8888'
Api.getMediaData = function (type, guestId) {
  return axios.get(`${baseUrl}/api/guest/${guestId}/media/${type}`)
}

Api.getMediaObjectUrl = function (type, key, guestId) {
  return `${baseUrl}/api/guest/${guestId}/media/${type}/${encodeURIComponent(key)}`
}

Api.getPhotoBundleUrl = function (guestId) {
  return `${baseUrl}/api/guest/${guestId}/media/photos/photo-bundle`
}

Api.getGuest = function (guestId) {
  return axios.get(`${baseUrl}/api/guest/${guestId}`)
}

Api.sendEmail = function (email, guestId) {
  return axios.post(`${baseUrl}/api/guest/${guestId}/subscribe`, { email })
}
export default Api
