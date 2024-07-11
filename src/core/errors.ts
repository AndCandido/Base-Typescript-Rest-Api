export class BaseError extends Error {
  constructor(
    public messages: string[],
    public error: string = "BAD_REQUEST",
    public statusCode: number = 400,
  ) {
    const message = messages.length == 1 ? messages[0] : messages.join(", ");
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }

  public getBody() {
    return {
      messages: this.messages,
      error: this.error,
      statusCode: this.statusCode,
    };
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(messages: string[]) {
    super(messages);
  }
}

export class InternalServerError extends BaseError {
  constructor(err: Error) {
    super(["Internal Server Error"], "INTERNAL_SERVER_ERROR", 500);

    console.log({
      message: err.message,
      stackTrace: err.stack,
      level: "fatal",
    });
  }
}
