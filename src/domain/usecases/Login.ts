import { User } from '../entities/User'
import { LoginInputPort } from '../ports/input/LoginInputPort'
import { JwtAuthenticationOutputPort } from '../ports/output/auth/AuthenticationOutputPort'
import { UserNotFoundError } from '../ports/output/db/UserNotFoundError'
import {
  GetUserByEmailOutputPort,
  SaveUserOutputPort,
} from '../ports/output/db/UserPersistanceOperationsOutputPort.ts'
import { LoginPresenterOutputPort } from '../ports/output/presenters/LoginPresenterOutputPort'

export class Login implements LoginInputPort {
  constructor(
    private readonly presenter: LoginPresenterOutputPort,
    private readonly userPersister: SaveUserOutputPort &
      GetUserByEmailOutputPort,
    private readonly authentication: JwtAuthenticationOutputPort,
  ) {}

  async login(name: string, email: string): Promise<void> {
    let foundUser: User | null = null
    try {
      foundUser = await this.userPersister.getByEmail(email)
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        foundUser = new User(name, email)
        this.userPersister.save(foundUser)
      } else {
        return this.presenter.presentDefaultError(e)
      }
    }

    const token = this.authentication.generateJwtFromUserId(foundUser.id)

    this.presenter.presentSuccessLogin({
      token,
      user: foundUser,
    })
  }
}
