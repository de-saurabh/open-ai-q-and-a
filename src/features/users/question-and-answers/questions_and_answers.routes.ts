import Router from "@koa/router";
import AuthMiddleware from "../../../middleware/auth.middleware";
import QuestionAndAnswerController from "./questions_and_answers.controller";

const questionAndAnswerRouter = new Router();

questionAndAnswerRouter.post("/create", QuestionAndAnswerController.create);

export { questionAndAnswerRouter };