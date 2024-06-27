export class BaseError extends Error {
  constructor(
    message: string,
    public error: string,
    public statusCode: number,
  ) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }

  public getBody() {
    return {
      message: this.message,
      error: this.error,
      statusCode: this.statusCode,
    };
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(message: string) {
    super(message, "BAD_REQUEST", 400);
  }
}

export class InternalServerError extends BaseError {
  constructor(err: Error) {
    super("Internal Server Error", "INTERNAL_SERVER_ERROR", 500);

    console.log({
      message: err.message,
      stackTrace: err.stack,
      level: "fatal",
    });
  }
}
