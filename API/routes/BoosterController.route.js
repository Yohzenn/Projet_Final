const express = require("express");
const BoosterController = require("../controllers/BoosterController");
const { authenticate } = require("../middlewares/auth");

const boosterRouter = express.Router();

boosterRouter.post(
  "/booster/open",
  authenticate, //fonction de verification, Middleware
  BoosterController.boosterOpening
);

boosterRouter.put(
  "/booster/reset",
  authenticate,
  BoosterController.resetBooster
);

module.exports = boosterRouter;
