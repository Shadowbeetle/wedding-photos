'use strict'
const joi = require('joi')

const schema = joi.object({
  PREVENT_PHOTO_DOWNLOAD: joi.boolean()
    .truthy(['true', 't', 'y', 'yes', '1'])
    .falsy([['false', 'f', 'n', 'no', '0']])
}).unknown().required()

const { error, value: envVars } = joi.validate(process.env, schema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  preventDownload: envVars.PREVENT_PHOTO_DOWNLOAD
}
