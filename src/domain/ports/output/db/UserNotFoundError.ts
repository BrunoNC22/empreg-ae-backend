export class UserNotFoundError extends Error {
  constructor(message: string = 'User not found') {
    super(message)
    this.name = 'UserNotFoundError'

    Error.captureStackTrace(this, this.constructor)
  }
}
