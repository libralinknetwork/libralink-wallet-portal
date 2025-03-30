class ApplicationError extends Error {
  errorCode: string;

  constructor(errorCode: string) {
    super("User not authenticated");
    this.errorCode = errorCode;
  }
}

export default ApplicationError;
