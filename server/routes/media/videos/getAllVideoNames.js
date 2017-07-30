'use strict'

module.exports = function getAllVideoNames (models, req, res) {
  const Video = models.Video
  return Video.getAll({_id: false, __v: false})
    .then((videoList) => res.send(videoList))
    .catch(err => {
      console.error(err)
      req.statusCode(500).send(err.message)
    })
}
