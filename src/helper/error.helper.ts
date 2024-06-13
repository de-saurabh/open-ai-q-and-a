import { Context } from "koa";

type CustomError = {
  status: number;
  message: string;
};

type Response = {
  status: boolean;
  message: string;
  error?: string | Array<string> | object;
  data: any;
};

enum ErrorType {
  Unauthorized = "Unauthorized",
  BadRequest = "BadRequest",
  Forbidden = "Forbidden",
  NotFound = "NotFound",
  IncorrectMailPassword = "IncorrectMailPassword",
  ValidationError = "ValidationError",
  LongResponseError = "LongResponseError",
  TooManyFailedAttempts = "TooManyFailedAttempts",
  InvalidSchool = "InvalidSchool",
  SessionAlreadyExists = "SessionAlreadyExists",
  InvalidCode = "InvalidCode",
  NoContent = "NoContents",
}
export class ErrorHelper {
  public static throwCustomErrorResponse(
    ctx: Context,
    customError: CustomError,
    errorObj?: any,
    data?: Record<string, any>,
  ) {
    const err: Response = {
      data,
      message: customError.message,
      status: false,
      error: errorObj,
    };

    ctx.status = customError.status;
    ctx.body = err;
  }
}

const CustomErrors: Record<keyof typeof ErrorType, CustomError> = {
  Unauthorized: {
    status: 401,
    message: "Unauthorized",
  },
  BadRequest: {
    status: 400,
    message: "Bad Request",
  },
  Forbidden: {
    status: 403,
    message: "Forbidden",
  },
  NotFound: {
    status: 404,
    message: "Not Found",
  },
  IncorrectMailPassword: {
    status: 400,
    message: "Email or Password incorrect",
  },
  ValidationError: {
    status: 400,
    message: "Validation error",
  },
  LongResponseError: {
    status: 414,
    message: "Too Long response error",
  },
  TooManyFailedAttempts: {
    status: 400,
    message: "Too many failed attempts",
  },
  InvalidSchool: {
    status: 400,
    message: "Invalid School",
  },
  SessionAlreadyExists: {
    status: 400,
    message: "Session Already Exists",
  },
  InvalidCode: {
    message: "Invalid code",
    status: 400,
  },
  NoContent: {
    message: "No Content",
    status: 204,
  },
};

export { CustomErrors };
