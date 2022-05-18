const passport = require('passport')
const express = require('express')

const clinicianController = require('../controllers/clinicianController.js')
const clinicianRouter = express.Router()
// add Express-Validator
const { body, validationResult, check } = require('express-validator')

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.screen_name !== undefined) {
        return res.redirect('/clinician/login')
    }
    return next();
}

const unAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() && req.user.screen_name === undefined) {
        return res.redirect('dashboard');
    } else if (req.isAuthenticated() && req.user.screen_name !== undefined) {
        return res.redirect('/patient/homepage');
    }
    return next();
}

// Login page (with failure message displayed upon login failure)
clinicianRouter.get('/login', unAuthenticated, (req, res) => {
    res.render('normal-clinicianLogin', { flash: req.flash('error'), title: 'Login' })
})

// Handle login
clinicianRouter.post('/login',
    passport.authenticate('clinician-login', {
        successRedirect: '/clinician/dashboard', failureRedirect: '/clinician/login', failureFlash: true
    })
)

// clinicianRouter.get('/login', (req, res) => res.render("normal-clinicianLogin"));
clinicianRouter.get('/forgetpass', unAuthenticated, (req, res) => res.render("normal-clinicianForgetpass"));
clinicianRouter.get('/dashboard', isAuthenticated, (req, res) => clinicianController.renderDashboard(req, res))
clinicianRouter.get('/individualData/:id', isAuthenticated, (req, res) => clinicianController.renderPatientData(req, res))
clinicianRouter.get('/editData/:id', isAuthenticated, (req, res) => clinicianController.renderClinicianEditData(req, res))
clinicianRouter.get('/newPatient', isAuthenticated, (req, res) => clinicianController.renderNewPatient(req, res))
clinicianRouter.get('/commentList', isAuthenticated, (req, res) => clinicianController.renderCommentList(req, res))
clinicianRouter.get('/aboutMe', isAuthenticated, (req, res) => clinicianController.renderClinicianData(req, res))
clinicianRouter.get('/changepass', isAuthenticated, (req, res) => res.render("normal-changepass", { layout: 'clinician.hbs' }));
clinicianRouter.get('/individual/:id/prevNotes', isAuthenticated, (req, res) => clinicianController.renderPrevNotes(req, res))

clinicianRouter.post('/forgetpass', unAuthenticated, (req, res) => clinicianController.forgetPassword(req, res))
clinicianRouter.post('/individualData/:id/addNote', isAuthenticated, (req, res) => clinicianController.addNote(req, res))
clinicianRouter.post('/dashboard/search', isAuthenticated, (req, res) => clinicianController.searchDashboard(req, res))
clinicianRouter.post('/comment/search', isAuthenticated, (req, res) => clinicianController.searchComment(req, res))
clinicianRouter.post('/newPatient', isAuthenticated, (req, res) => clinicianController.addNewPatient(req, res))
clinicianRouter.post('/editData/:id', isAuthenticated, (req, res) => clinicianController.editPatientData(req, res))
clinicianRouter.post('/individualData/support_msg/:id', isAuthenticated, (req, res) => clinicianController.saveSupportMsg(req, res))
clinicianRouter.post('/aboutMe', isAuthenticated, (req, res) => clinicianController.saveClinicianBio(req, res))
clinicianRouter.post('/individualData/searchDate/:id', isAuthenticated, (req, res) => clinicianController.searchDate(req, res))
clinicianRouter.post('/changepass', isAuthenticated, (req, res) => clinicianController.changePassword(req, res))


//if validator needed
// clinicianRouter.post('/newPatient', 
// body('name', 'cannot be empty').not().isEmpty().escape(), 
// body('phone', 'must be a number').isNumeric().escape(), 
// body('email', 'must be an email address').isEmail().escape(), 
// body('password', 'must be at least 8 characters long').isLength({min:8}).escape(),
// (req,res)=> clinicianController.addNewPatient(req,res))

module.exports = clinicianRouter