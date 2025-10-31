import { User } from 'src/domain/entities/User'

export interface UpdateUserPresenterOutputPort {
  presentUserNotFound(e: Error): void
  presentDefaultError(e: Error): void
  presentSuccessUpdateUser(user: User): void
}
