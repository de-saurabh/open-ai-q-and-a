import Router from "@koa/router";
import QuestionAndAnswerController from "./questions_and_answers.controller";

const questionAndAnswerRouter = new Router();

questionAndAnswerRouter.post("/create", QuestionAndAnswerController.create);
questionAndAnswerRouter.get("/:questionId", QuestionAndAnswerController.getQuestion);

export { questionAndAnswerRouter };
