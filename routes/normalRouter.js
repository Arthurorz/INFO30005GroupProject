const express = require("express");
const normalRouter = express.Router();
constnoemalController = require("../controllers/normalController.js");

normalRouter.get('/landingPage', (req, res) => res.render("normal-landingPage"));
normalRouter.get('/aboutDiabetes', (req, res) => res.render("normal-aboutDia"));
normalRouter.get('/aboutThisWeb', (req, res) => res.render("normal-aboutWeb"));
normalRouter.get('/patientLogin', (req, res) => res.render("normal-patientLogin"));
normalRouter.get('/clinicianLogin', (req, res) => res.render("normal-clinicianLogin"));
normalRouter.get('/patientForgetpass', (req, res) => res.render("normal-forgetpass"));
normalRouter.get('/clinicianForgetpass', (req, res) => res.render("normal-forgetpass"));

module.exports = normalRouter