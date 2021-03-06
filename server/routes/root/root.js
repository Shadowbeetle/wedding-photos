'use strict'
const path = require('path')

module.exports = function getAllPhotoNames (req, res) {
  if (process.env.NODE_ENV === 'production') {
    return res.sendFile('index.html', {
      root: path.join(__dirname + '/../../../build/'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }, (err) => {
      console.error(err, 'root')
    })
  } else {
    return res.redirect('http://localhost:3000')
  }
}
