'use strict'
const path = require('path')
module.exports = function getAllPhotoNames (models, req, res) {
  const name = path.basename(req.params.videoKey)
  models.weddingMedia.getMediaDataByKey(req.params.videoKey)
    .then((data) => {
      res.set({
        'content-length': data.ContentLength
      })
      res.attachment(name)
      models.weddingMedia.getMediaByKey(req.params.videoKey)
        .pipe(res)
    })
}
