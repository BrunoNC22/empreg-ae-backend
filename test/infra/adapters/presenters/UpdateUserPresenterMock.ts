import { User } from 'src/domain/entities/User'
import { UpdateUserPresenterOutputPort } from 'src/domain/ports/output/presenters/UpdateUserPresenterOutputPort'

export class UpdateUserPresenterMock implements UpdateUserPresenterOutputPort {
  defaultError: Error | null
  userNotFoundError: Error | null
  successUser: User | null
  presentDefaultError(e: Error): void {
    this.defaultError = e
  }

  presentSuccessUpdateUser(user: User): void {
    this.successUser = user
  }

  presentUserNotFound(e: Error): void {
    this.userNotFoundError = e
  }
}
