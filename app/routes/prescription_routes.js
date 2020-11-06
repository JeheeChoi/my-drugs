// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for prescriptions
const Prescription = require('../models/prescription')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE Prescriptions - create a new prescription
// ownership required
router.post('/prescriptions', requireToken, (req, res, next) => {
  // set owner of new prescription to be current user
  req.body.prescription.owner = req.user.id

  Prescription.create(req.body.prescription)
    // use this function to send 404 when non-existant document is requested
    .then(handle404)
    .then(prescription => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, prescription)
      // create the prescription ONLY IF the above didn't throw
      // respond to succesful `create` with status 201 and JSON of new prescription
      res.status(201).json({ prescription: prescription.toObject() })
    })

    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// GET Prescriptions - show all the prescriptions user created
router.get('/prescriptions', requireToken, (req, res, next) => {
  // Prescription.find({ owner: req.user.id })
  Prescription.find()
    .then(prescriptions => {
      // prescription array of Mongoose documents
      // convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return prescriptions.map(prescription => prescription.toObject())
    })
    // respond with status 200 and JSON of the prescriptions
    .then(prescriptions => res.status(200).json({ prescriptions: prescriptions }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
