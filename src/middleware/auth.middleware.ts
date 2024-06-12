import {Context} from "koa";
import jwt from "jsonwebtoken";
import {CustomErrors, ErrorHelper} from "../helper/error.helper";

export default class AuthMiddleware {
    public static async verify(ctx: Context, next: () => any) {
        const jwtSecret = process.env.JWT_SECRET || 'secret';
        let token = ctx.request.headers.authorization;
        if (token && token.startsWith('Bearer '))
            token = token.slice(7, token.length);
        if (token) {
            try {
                jwt.verify(token, jwtSecret, { } );
                await next();
            } catch (error: unknown) {
                ErrorHelper.throwCustomErrorResponse(ctx, CustomErrors.Unauthorized, {message: (error as any).message});
            }
        } else ErrorHelper.throwCustomErrorResponse(ctx, CustomErrors.Unauthorized);
    }
}