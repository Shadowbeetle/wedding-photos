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

app.use(helmeht())
app.use(compression())
app.use(cors({
  origin: 'http://localhost:3000'
}))

app.get(['/', '/photos', '/videos'], routes.root)
app.get('/api/media/photos', routes.media.photos.getAllPhotoNames.bind(null, models))
app.get('/api/media/photos/:photoKey', routes.media.photos.getPhoto.bind(null, models))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(publicPath))
}

module.exports = app
