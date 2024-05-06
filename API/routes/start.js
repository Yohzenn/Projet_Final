const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthentificationController = require("../controllers/AuthentificationController");
const AuthMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/users", UsersController.index);
router.post("/users", UsersController.store);
router.get("/users/:id", UsersController.show);
router.put("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.destroy);
router.get("/users/:id/house", UsersController.searchhouse);
router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  AuthMiddleware.authenticate,
  UsersController.getMyProfile
);
module.exports = router;

//* /users en GET = tous les utilisateurs
//* /users en POST = créer un utilisateur
//* /users/:id en GET = un utilisateur
//* /users/:id en PUT = modifier un utilisateur
// /users/:id en DELETE = supprimer un utilisateur
