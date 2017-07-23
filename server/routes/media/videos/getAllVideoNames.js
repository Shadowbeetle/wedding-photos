'use strict'

module.exports = function getAllPhotoNames (models, req, res) {
  return models.weddingMedia.listVideos()
    .then((videoList) => res.send(videoList))
    .catch(err => {
      console.error(err)
      req.statusCode(500).send(err.message)
    })
}
