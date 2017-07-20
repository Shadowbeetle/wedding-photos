'use strict'
const TYPE = 'photos'

module.exports = function getAllPhotoNames (models, req, res) {
  return models.weddingMedia.listMediaByType(TYPE)
    .then((photoList) => res.send(photoList))
    .catch(err => {
      console.error(err)
      req.statusCode(500).send(err.message)
    })
}
