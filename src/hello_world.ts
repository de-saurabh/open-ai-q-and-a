import {Context} from "koa";

export default class HelloWorldService {
    public static helloWorld(ctx: Context) {
        try {
            const { name = 'World' } = ctx.request.body as { name: string};
            return ctx.body = `Hello ${name}`;
        } catch (error) {
            throw error;
        }
    }
}