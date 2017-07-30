'use strict'
module.exports = function getAllPhotoNames (models, req, res) {
  res.set({
    "Cache-Control": "public, max-age=2592000",
    ETag: req.params.photoKey,
    Expires: new Date(Date.now() + 2592000000).toUTCString()
  })
  models.weddingMedia.getMediaByKey(req.params.photoKey)
    .pipe(res)
}
