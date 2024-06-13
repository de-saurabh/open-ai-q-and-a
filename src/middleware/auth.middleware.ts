import { Context } from "koa";
import jwt from "jsonwebtoken";
import { CustomErrors, ErrorHelper } from "../helper/error.helper";
import { User } from "../entity/user.entity";
import { BlacklistedToken } from "../entity/blacklisted_token.entity";

export default class AuthMiddleware {
  public static async verify(ctx: Context, next: () => any) {
    const jwtSecret = process.env.JWT_SECRET || "secret";
    let token = ctx.request.headers.authorization;
    const isTokenBlacklisted = await BlacklistedToken.findOne({
      where: {
        token,
      },
    });
    if (!isTokenBlacklisted) {
      if (token && token.startsWith("Bearer "))
        token = token.slice(7, token.length);
      if (token) {
        try {
          const decoded = jwt.verify(token, jwtSecret, {});
          const user = await User.findOne({
            where: {
              email: (decoded as any).email
            }
          });
          ctx.state.user = user;
          await next();
        } catch (error: unknown) {
          ErrorHelper.throwCustomErrorResponse(ctx, CustomErrors.Unauthorized, {
            message: (error as any).message
          });
        }
      } else ErrorHelper.throwCustomErrorResponse(ctx, CustomErrors.Unauthorized);
    } else ErrorHelper.throwCustomErrorResponse(ctx, CustomErrors.Unauthorized);
  }
}
