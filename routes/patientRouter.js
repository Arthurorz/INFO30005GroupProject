const passport = require('passport')
const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controllers/patientController.js')


// patientRouter.get('/login', (req, res) => res.render("normal-patientLogin"));
patientRouter.get('/forgetpass', (req, res) => res.render("normal-forgetpass"));
patientRouter.get('/homepage/:id', patientController.renderHomePage)
patientRouter.get('/addData/:type/:id',patientController.renderAddPage)
patientRouter.post('/addData/:type/:id',patientController.updateRecord)
patientRouter.get('/moredata/:id',patientController.renderMoreData)

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/patient/login')
    }
    return next()
}

// Login page (with failure message displayed upon login failure)
patientRouter.get('/login', (req, res) => {
    res.render('normal-patientLogin', { flash: req.flash('error'), title: 'Login' })
})

// Handle login
patientRouter.post('/login',
    passport.authenticate('patient-login', {
        successRedirect: '/patient/homepage/:id', failureRedirect: '/patient/login', failureFlash: true
    })
)

module.exports = patientRouter