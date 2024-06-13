import { Question } from "../../../entity/question.entity";
import {PostgresDataSource} from "../../../app-data-source";
import {User} from "../../../entity/user.entity";
import {Answer} from "../../../entity/answer.entity";
import {OpenAIHelper} from "../../../helper/open_ai.helper";

export class QuestionAndAnswersService {
  public async createQuestion(questionString: string, user: User) {
    try {
      const queryRunner = PostgresDataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const question = new Question();
        question.question = questionString;
        question.user = user;

        const answerString = await new OpenAIHelper(process.env.OPEN_AI_API_KEY as string).askQuestion(questionString);

        const answer = new Answer();
        answer.question = question;
        answer.answer = answerString;

        await queryRunner.manager.save(question);
        await queryRunner.manager.save(answer);
        await queryRunner.commitTransaction();

        return {
          question: questionString,
          answer: answerString,
        };
      } catch (err) {
        await queryRunner.rollbackTransaction();
        return err;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      throw error;
    }
  }
}
