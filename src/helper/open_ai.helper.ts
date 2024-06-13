import axios from "axios";
import { OpenAIResponse } from "./helper.types";

export class OpenAIHelper {
  private readonly apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async askQuestion(question: string = "How old is planet earth?") {
    try {
      const model = process.env.OPEN_AI_MODEL || "gpt-3.5-turbo";
      const role = process.env.OPEN_AI_ROLE || "user";
      const temperature =
        parseFloat(process.env.OPEN_AI_TEMPERATURE as string) || 0.7;
      const auth = `Bearer ${this.apiKey}`;
      let data = JSON.stringify({
        model: model,
        messages: [
          {
            role: role,
            content: question,
          },
        ],
        temperature: temperature,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        data: data,
      };

      const { data: resData }: { data: OpenAIResponse } =
        await axios.request(config);
      const { choices } = resData;
      const [choice] = choices;
      const {
        message: { content: answer },
      } = choice;
      return answer;
    } catch (error) {
      throw error;
    }
  }
}
