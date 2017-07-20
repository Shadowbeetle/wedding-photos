'use strict'
const express = require('express')
const compression = require('compression')
const path = require('path')
const models = require('./models')
const routes = require('./routes')
const app = express()
const publicPath = path.join(__dirname, '../build')

app.use(compression())
app.use(express.static(publicPath))

app.get('/api/media/photos', routes.media.photos.getAllPhotoNames.bind(null, models))
app.get('/api/media/photos/:photoKey', routes.media.photos.getPhoto.bind(null, models))

module.exports = app
