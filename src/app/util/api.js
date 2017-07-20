import axios from 'axios'
import {baseUrl} from './consts'
const Api = {}

Api.verifyNewUser = function (email, kitNumber) {
  return axios.get(`${baseUrl}/user/${email}/kit/${kitNumber}`)
}

Api.register = function (registrationData) {
  return axios.post(`${baseUrl}/user`, registrationData)
}
export default Api
