'use strict'
module.exports = function getAllPhotoNames (models, req, res) {
  return models.weddingMedia.listPhotos()
    .then((photoList) => res.send(photoList))
    .catch(err => {
      console.error(err)
      req.statusCode(500).send(err.message)
    })
}
