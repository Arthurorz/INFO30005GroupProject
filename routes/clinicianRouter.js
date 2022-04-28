const express = require('express')

const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController.js')

clinicianRouter.get('/dashboard/626392e9a4d69d527a31780f',(req,res)=> clinicianController.renderDashboard(req,res))
clinicianRouter.get('/individualData/:id', (req,res)=>clinicianController.renderPatientData(req,res))
clinicianRouter.post('/:name',(req,res)=> clinicianController.searchDashboard(req,res))

module.exports = clinicianRouter