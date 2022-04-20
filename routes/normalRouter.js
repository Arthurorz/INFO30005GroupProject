const express = require("express");
const controller = require("../controllers/normalController.js");

const normalRouter = express.Router;

normalRouter.post("/", controller.login);