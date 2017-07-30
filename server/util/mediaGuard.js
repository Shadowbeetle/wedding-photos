'use strict'
const config = require('../../config')
const path = require('path')
const _ = require('lodash')
/**
 * checks PREVENT_PHOTO_DOWNLOAD PREVENT_VIDEO_DOWNLOAD env vars and sends emtpy response if they are set
 * @param {*} value: value to be sent
 * @param {number} statusCode: status code to be used
 */
module.exports = function mediaGuard (value, statusCode=200) {
  return function mediaGuardHandler (req, res, next) {
    const type = _.head(req.path.match('videos|photos'))
    if (_.get(config[type], 'preventDownload')) {
      return value ? res.status(statusCode).send(value) : res.status(statusCode).send()
    } else {
      next()
    }
  }
}
