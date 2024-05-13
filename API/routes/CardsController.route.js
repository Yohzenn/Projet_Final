const express = require("express");
const CardsController = require("../controllers/CardsController");
const { authenticate } = require("../middlewares/auth");

const cardsRouter = express.Router();

cardsRouter.get("/user/cards", authenticate, CardsController.showUserCards);

module.exports = cardsRouter;
