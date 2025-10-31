import { Response } from 'express'
import { User } from 'src/domain/entities/User'
import { UpdateUserPresenterOutputPort } from 'src/domain/ports/output/presenters/UpdateUserPresenterOutputPort'
import { GetUserDto } from '../dto/UserDto'
import { ErrorResponse } from '../types/ErrorResponseType'

export class UpdateuserRestpresenter implements UpdateUserPresenterOutputPort {
  constructor(
    private readonly response: Response<GetUserDto | ErrorResponse>,
  ) {}

  presentDefaultError(e: Error): void {
    this.response
      .status(500)
      .send({ message: `Error while updating user: ${e.message}` })
  }

  presentSuccessUpdateUser(user: User): void {
    this.response.status(200).send({
      id: user.id,
      age: user.age,
      city: user.city,
      email: user.email,
      name: user.name,
    })
  }

  presentUserNotFound(e: Error): void {
    this.response.status(404).send({ message: `User not found: ${e.message}` })
  }
}
