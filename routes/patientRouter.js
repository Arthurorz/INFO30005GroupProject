const passport = require('passport')
const express = require('express')

const patientRouter = express.Router()
const patientController = require('../controllers/patientController.js')
//add express validator
const { body, validationResult, check } = require('express-validator')

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.screen_name === undefined) {
        return res.redirect('/patient/login')
    }
    return next();
}

const unAuthenticated = (req, res, next)=> {
    if (req.isAuthenticated() && req.user.screen_name !== undefined){
        return res.redirect('homepage');
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
        successRedirect: '/patient/homepage', failureRedirect: '/patient/login', failureFlash: true
    })
)

// patientRouter.get('/login', (req, res) => res.render("normal-patientLogin"));
patientRouter.get('/forgetpass', unAuthenticated, (req, res) => res.render("normal-patientForgetpass"));
patientRouter.post('/forgetpass', unAuthenticated, (req,res)=> patientController.forgetPassword(req,res))
patientRouter.get('/homepage', isAuthenticated, patientController.renderHomePage);
patientRouter.get('/addData/:type', isAuthenticated, patientController.renderAddPage);
patientRouter.post('/addData/:type', isAuthenticated, patientController.updateRecord);
patientRouter.get('/moredata', isAuthenticated, patientController.renderMoreData);
patientRouter.get('/aboutDiabetes', isAuthenticated, (req, res) => res.render("normal-aboutDia", { layout: 'patient.hbs', screen_name: req.user.screen_name }));
patientRouter.get('/aboutThisWeb', isAuthenticated, (req, res) => res.render("normal-aboutWeb", { layout: 'patient.hbs', screen_name: req.user.screen_name }));
patientRouter.get('/detaildata/:day/:month/:year', isAuthenticated, patientController.renderdetail);
patientRouter.get('/changepass', isAuthenticated, (req, res) => res.render("normal-changepass", { layout: 'patient.hbs' }));
patientRouter.post('/changepass', isAuthenticated, (req,res)=> patientController.changePassword(req,res))
// patientRouter.get('/aboutMe', isAuthenticated, patientController.renderAboutMe);
patientRouter.get('/motivation', isAuthenticated, patientController.renderLeaderBoard);

module.exports = patientRouter