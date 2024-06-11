import Router from "@koa/router";
import UsersController from "./users.controller";

const userRoutes = new Router();

userRoutes.post("/create", UsersController.create);
userRoutes.post("/login", UsersController.login);

export { userRoutes };