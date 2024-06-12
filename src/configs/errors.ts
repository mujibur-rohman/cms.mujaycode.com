export class AuthenticationError extends Error {
  constructor() {
    super("Access to this action requires authentication.");
  }
}
