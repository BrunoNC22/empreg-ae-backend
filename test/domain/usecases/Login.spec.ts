import { UserNotFoundError } from 'src/domain/ports/output/db/UserNotFoundError'
import { Login } from 'src/domain/usecases/Login'
import { AuthenticationMock } from 'test/infra/adapters/auth/AuthenticationMock'
import { UserPersisterMock } from 'test/infra/adapters/db/UserPersisterMock'
import { LoginPresenterMock } from 'test/infra/adapters/presenters/LoginPresenterMock'
import { createFakeUser } from '../entities/createFakeUser'

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
