const express = require('express')

const clinicianController = require('../controllers/clinicianController.js')

const clinicianRouter = express.Router()

clinicianRouter.get('/dashboard/626392e9a4d69d527a31780f',(req,res)=> clinicianController.renderDashboard(req,res))
clinicianRouter.get('/individualData/:id', (req,res)=>clinicianController.renderPatientData(req,res))
clinicianRouter.get('/editData/:id', (req,res)=>clinicianController.renderClinicianEditData(req,res))
clinicianRouter.get('/newPatient', (req,res)=>clinicianController.renderNewPatient(req,res))

clinicianRouter.post('/search',(req,res)=> clinicianController.searchDashboard(req,res))

module.exports = clinicianRouter