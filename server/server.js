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

app.use(helmet())
app.use(compression())
app.use(express.static(publicPath))
app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.static('build'))

app.get('/api/media/photos', routes.media.photos.getAllPhotoNames.bind(null, models))
app.get('/api/media/photos/:photoKey', routes.media.photos.getPhoto.bind(null, models))
app.get('/photos', routes.root)

module.exports = app
