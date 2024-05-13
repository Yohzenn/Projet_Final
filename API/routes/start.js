const express = require("express");
const userRouter = require("./UserController.route");
const authRouter = require("./AuthController.route");
const boosterRouter = require("./BoosterController.route");
const cardsRouter = require("./CardsController.route");

const router = express.Router();

router.use("/", userRouter);
router.use("/", authRouter);
router.use("/", boosterRouter);
router.use("/", cardsRouter);

module.exports = router;

//* /users en GET = tous les utilisateurs
//* /users en POST = créer un utilisateur
//* /users/:id en GET = un utilisateur
//* /users/:id en PUT = modifier un utilisateur
// /users/:id en DELETE = supprimer un utilisateur
