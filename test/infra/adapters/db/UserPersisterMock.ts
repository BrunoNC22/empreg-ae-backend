import { User } from 'src/domain/entities/User'
import { UserPersistanceOperationsOutputPort } from 'src/domain/ports/output/db/UserPersistanceOperationsOutputPort.ts'
import { createFakeUser } from 'test/domain/entities/createFakeUser'

export class UserPersisterMock implements UserPersistanceOperationsOutputPort {
  returnUser: User = createFakeUser({})
  saveUser: User | null = null
  id: string | null = null
  email: string | null = null
  getByEmailError: Error | null = null
  getByIdError: Error | null = null

  constructor(
    _returnUser?: User,
    _getByEmailError?: Error,
    _getByIdError?: Error,
  ) {
    if (_returnUser) {
      this.returnUser = _returnUser
    }
    if (_getByEmailError) {
      this.getByEmailError = _getByEmailError
    }
    if (_getByIdError) {
      this.getByIdError = _getByIdError
    }
  }

  async getByEmail(email: string): Promise<User> {
    this.email = email
    if (this.getByEmailError) throw this.getByEmailError

    return this.returnUser
  }

  async getById(id: string): Promise<User> {
    this.id = id
    if (this.getByIdError) throw this.getByIdError
    return this.returnUser
  }

  async save(user: User): Promise<void> {
    this.saveUser = user
    return Promise.resolve()
  }
}
