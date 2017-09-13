'use strict'
module.exports = function getGuest (models, req, res) {
  const Guest = models.Guest
  Guest.findByGuestId(req.params.guestId)
    .then((guest) => {
      if (guest) {
        return res.sendStatus(200)
      } else {
        res.sendStatus(403)
      }
    })
    .catch((err) => {
      console.error(err)
      res.send('There was an error processing your request. Please contact the bridegroom.')
    })
}
