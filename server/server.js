'use strict'
const express = require('express')
const compression = require('compression')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const models = require('./models')
const routes = require('./routes')
const app = express()
const publicPath = path.join(__dirname, '../build')

if (process.env.NODE_ENV === 'production' && process.env.IS_HEROKU) {
  app.use((req, res, next) => {
    if (req.headers[ 'x-forwarded-proto' ] !== 'https') {
      res.redirect(302, 'https://' + req.hostname + req.originalUrl)
    }
    else {
      next()
    }
  })
}

app.use(helmet({
  frameguard: process.env.NODE_ENV === 'production'
    ? { action: 'sameorigin' }
    : false
}))

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.get(['/', '/photos', '/videos'], compression(), routes.root)
app.get('/api/media/photos', compression(), routes.media.photos.getAllPhotoNames.bind(null, models))
app.get('/api/media/photos/photo-bundle', routes.media.photos.getPhotoBundle.bind(null, models))
app.get('/api/media/photos/:photoKey', compression(), routes.media.photos.getPhoto.bind(null, models))
app.get('/api/media/videos', compression(), routes.media.videos.getAllVideoNames.bind(null, models))
app.get('/api/media/videos/:videoKey', routes.media.videos.getVideo.bind(null, models))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(publicPath))
}

module.exports = app
