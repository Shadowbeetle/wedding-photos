'use strict'
const path = require('path')
module.exports = function getAllPhotoNames (models, req, res) {
  const name = path.basename(req.params.videoKey)
  res.attachment(name)
  models.weddingMedia.getMediaByKey(req.params.videoKey)
    .pipe(res)
}
