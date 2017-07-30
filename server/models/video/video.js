'use strict'
require('../db')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const MODEL_NAME = 'video'

/**
 * @typedef {Object} Video
 * @property {string} aws
 * @property {string[]} youtube
 */
const videoSchema = new Schema({
  aws: {
    type: String, required: true, index: true, unique: true, trim: true
  },
  youtube: {
    type: String, required: true, index: true, unique: true, trim: true
  }
})

const Video = mongoose.model(MODEL_NAME, videoSchema)

/**
 * Get a video by ObjectId
 * @param {object=} projection
 * @returns {Query|Promise.<Video>}
 */
Video.getAll = function (projection) {
  return Video.find({}, projection)
}

module.exports = Video
