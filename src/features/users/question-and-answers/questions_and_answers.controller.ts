import { Context } from "koa";
import { UsersService } from "../users.service";
import { CreateUser } from "../users.types";
import { CustomErrors, ErrorHelper } from "../../../helper/error.helper";
import { QuestionAndAnswersService } from "./question_and_answers.service";

export default class QuestionAndAnswerController {
  public static async create(ctx: Context) {
    try {
      const { question } = ctx.request.body as any;
      const { user } = ctx.state;
      const questionAndAnswerService = new QuestionAndAnswersService();
      ctx.body = await questionAndAnswerService.createQuestion(question, user);
    } catch (error) {
      ErrorHelper.throwCustomErrorResponse(
        ctx,
        CustomErrors.BadRequest,
        error as Error,
      );
    }
  }

  public static async getQuestion(ctx: Context) {
    try {
      const questionAndAnswerService = new QuestionAndAnswersService();
      const { questionId = null } = ctx.params;
      ctx.body = await questionAndAnswerService.getQuestion(questionId);
    } catch (error) {
      ErrorHelper.throwCustomErrorResponse(
        ctx,
        CustomErrors.BadRequest,
        error as Error,
      );
    }
  }
}
