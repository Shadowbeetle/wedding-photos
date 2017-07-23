'use strict'
module.exports = function getAllPhotoNames (models, req, res) {
  models.weddingMedia.getMediaDataByKey('professional/photos/anna-tamas.zip')
    .then((data) => {
      res.set({
        'content-length': data.ContentLength
      })
      res.attachment('anna-tamas.zip')
      models.weddingMedia.getMediaByKey('professional/photos/anna-tamas.zip')
        .pipe(res)
    })
}
