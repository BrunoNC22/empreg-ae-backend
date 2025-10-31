import { User } from '../entities/User'
import { UpdateUserDto } from '../ports/input/updateUserInputPort/UpdateUserInputDto'
import { UpdateUserInputPort } from '../ports/input/updateUserInputPort/UpdateUserInputPort'
import { UserNotFoundError } from '../ports/output/db/UserNotFoundError'
import {
  GetUserByIdOutputPort,
  SaveUserOutputPort,
} from '../ports/output/db/UserPersistanceOperationsOutputPort.ts'
import { UpdateUserPresenterOutputPort } from '../ports/output/presenters/UpdateUserPresenterOutputPort'

export class UpdateUser implements UpdateUserInputPort {
  constructor(
    private readonly userPersister: GetUserByIdOutputPort & SaveUserOutputPort,
    private readonly presenter: UpdateUserPresenterOutputPort,
  ) {}

  async updateUser(user: UpdateUserDto): Promise<void> {
    let foundUser: User | null
    try {
      foundUser = await this.userPersister.getById(user.id)
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return this.presenter.presentUserNotFound(e)
      }
      return this.presenter.presentDefaultError(e)
    }

    if (user.age !== undefined) {
      foundUser.age = user.age
    }

    if (user.city !== undefined) {
      foundUser.city = user.city
    }

    if (user.email !== undefined) {
      foundUser.email = user.email
    }

    if (user.name !== undefined) {
      foundUser.name = user.name
    }

    try {
      await this.userPersister.save(foundUser)
    } catch (e) {
      return this.presenter.presentDefaultError(e)
    }

    return this.presenter.presentSuccessUpdateUser(foundUser)
  }
}
