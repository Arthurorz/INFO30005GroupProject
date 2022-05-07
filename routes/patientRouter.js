const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controllers/patientController.js')


patientRouter.get('/login', (req, res) => res.render("normal-patientLogin"));
patientRouter.get('/forgetpass', (req, res) => res.render("normal-forgetpass"));
patientRouter.get('/homepage/:id', patientController.renderHomePage)
patientRouter.get('/addData/:type/:id',patientController.renderAddPage)
patientRouter.post('/addData/:type/:id',patientController.updateRecord)
patientRouter.get('/moredata/:id',patientController.renderMoreData)

module.exports = patientRouter