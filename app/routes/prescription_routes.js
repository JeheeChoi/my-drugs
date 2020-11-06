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

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

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
//
//
//
// GET Prescriptions - show all the prescriptions user created
// router.get('/prescriptions', requiredToken, (req, res, next) => {
router.get('/prescriptions', requireToken, (req, res, next) => {
  // ADD REQUIREDTOKEN LATER
  // Prescription.find({ owner: req.user.id })
  Prescription.find({ owner: req.user.id })
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
// TEST CURL SCRIPT
// $ TOKEN=f59c72b262436889101ac901cb8d4493 sh curl-scripts/prescriptions/index.sh
//
//
//
// GET a specific prescription - show single prescription user is looking for
// ADD REQUIREDTOKEN LATER
// router.get('/prescriptions/:id', requiredToken, (req, res, next) => {
router.get('/prescriptions/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Prescription.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and prescription JSON
    .then(prescription => res.status(200).json({ prescription: prescription.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})
// TEST CURL SCRIPT
// $ ID=5fa4598238055a33a1426838 TOKEN=b3e9bb026d21a7f2ea7c845cebe93fe3
// sh curl-scripts/prescriptions/show.sh
// browser: http://localhost:4741/prescriptions/5fa4598238055a33a1426838
//
//
//
// UPDATE Prescription
router.patch('/prescriptions/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.prescription.owner

  Prescription.findById(req.params.id)
    .then(handle404)
    .then(prescription => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, prescription)

      // pass the result of Mongoose's `.update` to the next `.then`
      return prescription.updateOne(req.body.prescription)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})
//
//
//
//
// DELETE Prescription
router.delete('/examples/:id', requireToken, (req, res, next) => {
  Example.findById(req.params.id)
    .then(handle404)
    .then(example => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, example)
      // delete the example ONLY IF the above didn't throw
      example.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})


module.exports = router
