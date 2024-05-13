const express = require("express");
const AuthentificationController = require("../controllers/AuthentificationController");

const authRouter = express.Router();

authRouter.post("/login", AuthentificationController.login);

module.exports = authRouter;
