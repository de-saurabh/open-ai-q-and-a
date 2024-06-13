import { Context } from "koa";
import { UsersService } from "./users.service";
import { CreateUser, LoginUser } from "./users.types";
import { CustomErrors, ErrorHelper } from "../../helper/error.helper";

export default class UsersController {
  public static async create(ctx: Context) {
    try {
      const userService = new UsersService();
      ctx.body = await userService.create(ctx.request.body as CreateUser);
    } catch (error) {
      ErrorHelper.throwCustomErrorResponse(
        ctx,
        CustomErrors.BadRequest,
        error as Error,
      );
    }
  }

  public static async login(ctx: Context) {
    try {
      const userService = new UsersService();
      ctx.body = await userService.login(ctx.request.body as LoginUser);
    } catch (error) {
      ErrorHelper.throwCustomErrorResponse(
        ctx,
        CustomErrors.BadRequest,
        error as Error,
      );
    }
  }

  public static async logout(ctx: Context) {
    try {
      const token = ctx.request.headers.authorization;
      const { user } = ctx.state;
      const userService = new UsersService();
      ctx.body = await userService.logout(user, token as string);
    } catch (error) {
      ErrorHelper.throwCustomErrorResponse(
        ctx,
        CustomErrors.BadRequest,
        error as Error,
      );
    }
  }

  public static async profile(ctx: Context) {
    try {
      const { user } = ctx.state;
      const userService = new UsersService();
      ctx.body = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
    } catch (error) {
      ErrorHelper.throwCustomErrorResponse(
        ctx,
        CustomErrors.BadRequest,
        error as Error,
      );
    }
  }
}
