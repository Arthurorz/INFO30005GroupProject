const passport = require('passport')
const express = require('express')

const clinicianController = require('../controllers/clinicianController.js')
const clinicianRouter = express.Router()
// add Express-Validator
const { body, validationResult, check } = require('express-validator')



// clinicianRouter.get('/login', (req, res) => res.render("normal-clinicianLogin"));
clinicianRouter.get('/forgetpass', (req, res) => res.render("normal-forgetpass"));
clinicianRouter.get('/dashboard',(req,res)=> clinicianController.renderDashboard(req,res))
clinicianRouter.get('/individualData/:id', (req,res)=>clinicianController.renderPatientData(req,res))
clinicianRouter.get('/editData/:id', (req,res)=>clinicianController.renderClinicianEditData(req,res))
clinicianRouter.get('/newPatient', (req,res)=>clinicianController.renderNewPatient(req,res))
clinicianRouter.get('/commentList', (req,res)=>clinicianController.renderCommentList(req,res))
clinicianRouter.get('/aboutMe', (req, res) => clinicianController.renderClinicianData(req,res))

clinicianRouter.post('/individualData/:id/addNote', (req,res)=>clinicianController.addNote(req,res))
clinicianRouter.post('/dashboard/search',(req,res)=> clinicianController.searchDashboard(req,res))
clinicianRouter.post('/comment/search',(req,res)=> clinicianController.searchComment(req,res))
clinicianRouter.post('/newPatient',(req,res)=> clinicianController.addNewPatient(req,res))
clinicianRouter.post('/editData/:id',(req,res)=> clinicianController.editPatientData(req,res))
clinicianRouter.post('/individualData/support_msg',(req,res)=> clinicianController.saveSupportMsg(req,res))

//if validator needed
// clinicianRouter.post('/newPatient', 
// body('name', 'cannot be empty').not().isEmpty().escape(), 
// body('phone', 'must be a number').isNumeric().escape(), 
// body('email', 'must be an email address').isEmail().escape(), 
// body('password', 'must be at least 8 characters long').isLength({min:8}).escape(),
// (req,res)=> clinicianController.addNewPatient(req,res))

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('login')
    }
    return next();
}

const unAuthenticated = (req, res, next)=> {
    if (req.isAuthenticated()){
        return res.redirect('dashboard');
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

clinicianRouter.get('/forgetpass', (req, res) => res.render("normal-forgetpass"));
clinicianRouter.get('/dashboard', isAuthenticated, (req,res)=> clinicianController.renderDashboard(req,res))
clinicianRouter.get('/individualData/:id', isAuthenticated, (req,res)=>clinicianController.renderPatientData(req,res))
clinicianRouter.get('/editData/:id', isAuthenticated, (req,res)=>clinicianController.renderClinicianEditData(req,res))
clinicianRouter.get('/newPatient', isAuthenticated, (req,res)=>clinicianController.renderNewPatient(req,res))
clinicianRouter.get('/commentList', isAuthenticated, (req,res)=>clinicianController.renderCommentList(req,res))
clinicianRouter.get('/aboutMe', (req, res) => clinicianController.renderClinicianData(req,res))

clinicianRouter.post('/dashboard/search',(req,res)=> clinicianController.searchDashboard(req,res))
clinicianRouter.post('/comment/search',(req,res)=> clinicianController.searchComment(req,res))
clinicianRouter.post('/newPatient', isAuthenticated, (req,res)=> clinicianController.addNewPatient(req,res))
clinicianRouter.post('/editData/:id', isAuthenticated, (req,res)=> clinicianController.editPatientData(req,res))
clinicianRouter.post('/individualData/support_msg', isAuthenticated, (req,res)=> clinicianController.saveSupportMsg(req,res))


module.exports = clinicianRouter