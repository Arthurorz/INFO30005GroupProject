const express = require('express')

const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController.js')

clinicianRouter.get('/', clinicianController.renderDashboard)
clinicianRouter.get('/individualData', clinicianController.renderClinicianData)

module.exports = clinicianRouter