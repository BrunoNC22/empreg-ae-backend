import { User } from 'src/domain/entities/User'
import { AuthenticationOutputPort } from 'src/domain/ports/output/auth/AuthenticationOutputPort'
import { UserNotFoundError } from 'src/domain/ports/output/db/UserNotFoundError'
import { UserPersistanceOperationsOutputPort } from 'src/domain/ports/output/db/UserPersistanceOperationsOutputPort.ts'
import { LoginPresenterOutputPort } from 'src/domain/ports/output/presenters/LoginPresenterOutputPort'
import { Login } from 'src/domain/usecases/Login'

class LoginPresenterMock implements LoginPresenterOutputPort {
  defaultError: Error | null = null
  successLoginProps: { token: string; user: User } | null = null
  presentDefaultError(error: Error): void {
    this.defaultError = error
  }

  presentSuccessLogin(props: { token: string; user: User }): void {
    this.successLoginProps = props
  }
}

type CreateFakeUserParams = {
  name?: string
  email?: string
}

const createFakeUser = ({
  email = 'teste@mail.com',
  name = 'teste',
}: CreateFakeUserParams) => {
  return new User(name, email)
}

class UserPersisterMock implements UserPersistanceOperationsOutputPort {
  returnUser: User = createFakeUser({})
  saveUser: User | null = null
  id: string | null = null
  email: string | null = null
  getByEmailError: Error | null = null

  constructor(_returnUser?: User, _getByEmailError?: Error) {
    if (_returnUser) {
      this.returnUser = _returnUser
    }
    if (_getByEmailError) {
      this.getByEmailError = _getByEmailError
    }
  }

  async getByEmail(email: string): Promise<User> {
    this.email = email
    if (this.getByEmailError) throw this.getByEmailError

    return this.returnUser
  }

  async getById(id: string): Promise<User> {
    this.id = id
    return this.returnUser
  }

  async save(user: User): Promise<void> {
    this.saveUser = user
    return Promise.resolve()
  }
}

class AuthenticationMock implements AuthenticationOutputPort {
  jwtResponse: string = 'valid jwt'
  userId: string | null = null
  constructor(_jwtResponse?: string) {
    if (_jwtResponse) {
      this.jwtResponse = _jwtResponse
    }
  }

  generateJwtFromUserId(userId: string): string {
    this.userId = userId
    return this.jwtResponse
  }
}

type CreateSutProps = {
  authMock?: AuthenticationMock
  userPersisterMock?: UserPersisterMock
  loginPresenterMock?: LoginPresenterMock
}

const createSut = ({
  authMock = new AuthenticationMock(),
  loginPresenterMock = new LoginPresenterMock(),
  userPersisterMock = new UserPersisterMock(),
}: CreateSutProps) => {
  const sut = new Login(loginPresenterMock, userPersisterMock, authMock)

  return {
    sut,
    authMock,
    userPersisterMock,
    loginPresenterMock,
  }
}

describe('Login usecase', () => {
  it('Should get user from db using email', async () => {
    const { sut, userPersisterMock } = createSut({})

    await sut.login('valid name', 'valid@mail.com')

    expect(userPersisterMock.email).toBe('valid@mail.com')
  })

  it('Should create a new user if user with given email is not found', async () => {
    const { sut, userPersisterMock } = createSut({
      userPersisterMock: new UserPersisterMock(
        undefined,
        new UserNotFoundError(),
      ),
    })

    await sut.login('valid name', 'new_email@mail.com')

    expect(userPersisterMock.saveUser).toBeTruthy()
    expect(userPersisterMock.saveUser?.name).toBe('valid name')
    expect(userPersisterMock.saveUser?.email).toBe('new_email@mail.com')
  })

  it('Should create a jwt with auth service', async () => {
    const { sut, authMock } = createSut({})

    await sut.login('valid name', 'valid@email.com')

    expect(authMock.userId).toBeTruthy()
  })

  it('Should send user and token to presenter when user exists', async () => {
    const token = 'valid token'
    const { sut, loginPresenterMock } = createSut({
      authMock: new AuthenticationMock(token),
      userPersisterMock: new UserPersisterMock(
        createFakeUser({ name: 'some name', email: 'email@mail.com' }),
      ),
    })

    await sut.login('valid name', 'email@mail.com')

    expect(loginPresenterMock.successLoginProps).toBeTruthy()
    expect(loginPresenterMock.successLoginProps?.token).toBe(token)
    expect(loginPresenterMock.successLoginProps?.user.name).toBe('some name')
    expect(loginPresenterMock.successLoginProps?.user.email).toBe(
      'email@mail.com',
    )
  })
})
