const passport = require('passport')
const express = require('express')

const patientRouter = express.Router()
const patientController = require('../controllers/patientController.js')

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('login')
    }
    return next();
}

const unAuthenticated = (req, res, next)=> {
    if (req.isAuthenticated()){
        return res.redirect('homepage/:id');
    }
    return next();
}

// Login page (with failure message displayed upon login failure)
patientRouter.get('/login', unAuthenticated, (req, res) => {
    res.render('normal-patientLogin', { flash: req.flash('error'), title: 'Login' })
})

// Handle login
patientRouter.post('/login',
    passport.authenticate('patient-login', {
        successRedirect: '/patient/homepage/:id', failureRedirect: '/patient/login', failureFlash: true
    })
)

// patientRouter.get('/login', (req, res) => res.render("normal-patientLogin"));
patientRouter.get('/forgetpass', unAuthenticated, (req, res) => res.render("normal-forgetpass"));
patientRouter.get('/homepage/:id', isAuthenticated, patientController.renderHomePage)
patientRouter.get('/addData/:type/:id', isAuthenticated, patientController.renderAddPage)
patientRouter.post('/addData/:type/:id', isAuthenticated, patientController.updateRecord)
patientRouter.get('/moredata/:id', isAuthenticated, patientController.renderMoreData)


module.exports = patientRouter