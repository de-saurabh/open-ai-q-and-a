import Router from "@koa/router";
import UsersController from "./users.controller";
import { questionAndAnswerRouter } from "./question-and-answers/questions_and_answers.routes";
import AuthMiddleware from "../../middleware/auth.middleware";

const userRoutes = new Router();

userRoutes.post("/create", UsersController.create);
userRoutes.post("/login", UsersController.login);
userRoutes.get("/logout",AuthMiddleware.verify, UsersController.logout);
userRoutes.get("/profile",AuthMiddleware.verify, UsersController.profile);
userRoutes.use(
  "/questions",
  AuthMiddleware.verify,
  questionAndAnswerRouter.routes(),
);

export { userRoutes };
