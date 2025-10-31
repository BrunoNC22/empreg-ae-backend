import { Response } from 'express'
import { GetUserDto } from 'src/infra/adapters/rest/dto/UserDto'
import { User } from 'src/domain/entities/User'
import { LoginPresenterOutputPort } from 'src/domain/ports/output/presenters/LoginPresenterOutputPort'
import { ErrorResponse } from '../types/ErrorResponseType'

export class LoginRestPresenter implements LoginPresenterOutputPort {
  constructor(
    private readonly response: Response<GetUserDto | ErrorResponse>,
  ) {}

  presentDefaultError(error: Error): void {
    this.response.status(500).send({
      message: `internal server error while logging in: ${error.message}`,
    })
  }

  presentSuccessLogin(props: { token: string; user: User }): void {
    this.response
      .status(200)
      .cookie('auth', props.token, { httpOnly: true })
      .send({
        name: props.user.name,
        age: props.user.age,
        id: props.user.id,
        city: props.user.city,
        email: props.user.email,
      })
  }
}
