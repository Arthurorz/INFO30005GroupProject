const passport = require('passport')
const express = require('express')

const clinicianController = require('../controllers/clinicianController.js')

const clinicianRouter = express.Router()


// clinicianRouter.get('/login', (req, res) => res.render("normal-clinicianLogin"));
clinicianRouter.get('/forgetpass', (req, res) => res.render("normal-forgetpass"));
clinicianRouter.get('/dashboard',(req,res)=> clinicianController.renderDashboard(req,res))
clinicianRouter.get('/individualData/:id', (req,res)=>clinicianController.renderPatientData(req,res))
clinicianRouter.get('/editData/:id', (req,res)=>clinicianController.renderClinicianEditData(req,res))
clinicianRouter.get('/newPatient', (req,res)=>clinicianController.renderNewPatient(req,res))
clinicianRouter.get('/commentList', (req,res)=>clinicianController.renderCommentList(req,res))
clinicianRouter.get('/aboutMe', (req, res) => clinicianController.renderClinicianData(req,res))


clinicianRouter.post('/search',(req,res)=> clinicianController.searchDashboard(req,res))
clinicianRouter.post('/newPatient',(req,res)=> clinicianController.addNewPatient(req,res))
clinicianRouter.post('/editData/:id',(req,res)=> clinicianController.editPatientData(req,res))
clinicianRouter.post('/individualData/support_msg',(req,res)=> clinicianController.saveSupportMsg(req,res))

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/clinician/login')
    }
    return next()
}

// Login page (with failure message displayed upon login failure)
clinicianRouter.get('/login', (req, res) => {
    res.render('normal-clinicianLogin', { flash: req.flash('error'), title: 'Login' })
})

// Handle login
clinicianRouter.post('/login',
    passport.authenticate('clinician-login', {
        successRedirect: '/clinician/dashboard', failureRedirect: '/clinician/login', failureFlash: true
    })
)


module.exports = clinicianRouter