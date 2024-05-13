const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthMiddleware = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.get("/users", UsersController.index);
userRouter.post("/users", UsersController.store);
userRouter.get("/users/:id", UsersController.show);
userRouter.put("/users/:id", UsersController.update);
userRouter.delete("/users/:id", UsersController.destroy);
userRouter.get("/users/:id/house", UsersController.searchhouse);
userRouter.get(
  "/getMyProfile",
  AuthMiddleware.authenticate,
  UsersController.getMyProfile
);

module.exports = userRouter;
