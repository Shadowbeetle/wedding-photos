'use strict'
'use strict'
module.exports = function getGuest (models, req, res) {
  const Guest = models.Guest
  Guest.subscribe(req.params.guestId, req.body.email)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('There was an error processing your request. Please contact the bridegroom.')
    })
}
