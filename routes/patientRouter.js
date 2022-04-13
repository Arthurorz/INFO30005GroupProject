//用不了
const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controllers/patientController.js')

patientRouter.get('/patients', patientController.getAllPatientData)

module.exports = patientRouter