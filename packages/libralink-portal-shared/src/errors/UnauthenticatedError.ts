class UnauthenticatedError extends Error {
  constructor() {
    super("User not authenticated");
  }
}

export default UnauthenticatedError;
