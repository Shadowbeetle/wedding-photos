'use strict'
module.exports = function authorize (models) {
  return (req, res, next) => {
    const Guest = models.Guest
    const id = req.params.guestId
    Guest.findByGuestId(id)
      .then((guest) => {
        if (guest) {
          return next()
        } else {
          return res.sendStatus(403)
        }
      })
      .catch((err) => {
        console.error({ id, err })
        res.send('There was an error processing your request. Please contact the bridegroom.')
      })
  }
}
