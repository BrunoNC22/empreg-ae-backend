import { LoginRestPresenter } from 'src/infra/adapters/rest/presenters/LoginRestPresenter'
import { Response } from 'express'
import { User } from 'src/domain/entities/User'

const createSut = () => {
  const httpResponse = {} as Response
  httpResponse.status = jest.fn().mockReturnValueOnce(httpResponse)
  httpResponse.cookie = jest.fn().mockReturnValueOnce(httpResponse)
  httpResponse.send = jest.fn()

  const sut = new LoginRestPresenter(httpResponse)
  return { sut, httpResponse }
}

describe('LoginRestPresenter', () => {
  it('Should send response with status 500 ondefault error', () => {
    const { sut, httpResponse } = createSut()

    sut.presentDefaultError(new Error('any message'))

    expect(httpResponse.status).toHaveBeenCalledWith(500)
    expect(httpResponse.send).toHaveBeenCalledWith({
      message: `internal server error while logging in: ${'any message'}`,
    })
  })

  it('Should send response with cookie and user', () => {
    const { sut, httpResponse } = createSut()
    const user = new User('any name', 'any email')

    sut.presentSuccessLogin({ token: 'any token', user })

    expect(httpResponse.status).toHaveBeenCalledWith(200)
    expect(httpResponse.cookie).toHaveBeenCalledWith('auth', 'any token', {
      httpOnly: true,
    })
    expect(httpResponse.send).toHaveBeenCalledWith({
      name: user.name,
      age: user.age,
      id: user.id,
      city: user.city,
      email: user.email,
    })
  })
})
