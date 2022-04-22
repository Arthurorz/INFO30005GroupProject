const express = require("express");
const controller = require("../controllers/normalController.js");

const normalRouter = express.Router();

normalRouter.get('/', (req, res) => res.render("normal-landingPage"));
module.exports = normalRouter