const videos = require('./videoData')
const Video = require('../../server/models/video')

Promise.all(videos.map((video) => new Video(video).save()))
  .then(() => {
    console.log('videos saved to db')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
