const express = require("express");
const normalRouter = express.Router();
constnoemalController = require("../controllers/normalController.js");

normalRouter.get('/landingPage', (req, res) => res.render("normal-landingPage"));
normalRouter.get('/aboutDiabetes', (req, res) => res.render("normal-aboutDia"));
normalRouter.get('/aboutThisWeb', (req, res) => res.render("normal-aboutWeb"));
normalRouter.get('/login', (req, res) => res.render("normal-login"));
normalRouter.get('/forgetPassword', (req, res) => res.render("normal-forgetpass"));

module.exports = normalRouter