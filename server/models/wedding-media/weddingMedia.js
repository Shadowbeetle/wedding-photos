'use strict'
const AWS = require('aws-sdk')
const promisify = require('es6-promisify')
const _ = require('lodash')
const path = require('path')
const s3 = new AWS.S3()
const metadata = require('../metadata/photos.json')
const listObjects = promisify(s3.listObjects, s3)
const headObject = promisify(s3.headObject, s3)
const BUCKET_NAME = 'anna-tamas-eskuvo'

/**
 *
 * @returns {Promise<[Object]>}
 */
function listPhotos () {
  return listObjects({
    Bucket: BUCKET_NAME,
    Prefix: `professional/photos/thumbnails`
  })
    .then((objects) => {
      return _.chain(objects.Contents)
        .tail()
        .filter((content) => metadata[path.basename(content.Key)])
        .map((content, i) => {
          const name = path.basename(content.Key)
          const thumbnailObject = {
            name,
            key: content.Key,
            largeKey: content.Key.replace('thumbnails', 'large'),
            dimensions: metadata[ name ],
            index: i
          }
          return thumbnailObject
        })
        .value()
    })
}

/**
 *
 * @returns {Promise<[Object]>}
 */
function listVideos () {
  return listObjects({
    Bucket: BUCKET_NAME,
    Prefix: `professional/videos`
  })
    .then((objects) => {
      return _.chain(objects.Contents)
        .tail()
        .map((content, i) => {
          const name = path.basename(content.Key)
          return {
            name,
            key: content.Key,
            index: i
          }
        })
        .value()
    })
}

/**
 *
 * @param name
 * @returns {ReadStream}
 */
function getMediaByKey (name) {
  return s3.getObject({
    Bucket: BUCKET_NAME,
    Key: name
  }).createReadStream()
}

function getMediaDataByKey (name) {
  return headObject({
    Bucket: BUCKET_NAME,
    Key: name
  })
}

module.exports = {
  listPhotos,
  listVideos,
  getMediaByKey,
  getMediaDataByKey
}

module.exports.s3 = s3
