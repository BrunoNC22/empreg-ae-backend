import { Response } from 'express'
import { UserNotFoundError } from 'src/domain/ports/output/db/UserNotFoundError'
import { UpdateuserRestpresenter } from 'src/infra/adapters/rest/presenters/UpdateUserRestPresenter'
import { createFakeUser } from 'test/domain/entities/createFakeUser'

const createSut = () => {
  const httpResponse = {} as Response
  httpResponse.status = jest.fn().mockReturnValueOnce(httpResponse)
  httpResponse.send = jest.fn()

  const sut = new UpdateuserRestpresenter(httpResponse)
  return { sut, httpResponse }
}

describe('UpdateUserPresenter', () => {
  it('should send response with status 500 when in default error', () => {
    const { sut, httpResponse } = createSut()

    sut.presentDefaultError(new Error('any message'))

    expect(httpResponse.status).toHaveBeenCalledWith(500)
    expect(httpResponse.send).toHaveBeenCalledWith({
      message: `Error while updating user: ${'any message'}`,
    })
  })

  it('Should send response with status 404 when user is not found', () => {
    const { sut, httpResponse } = createSut()

    sut.presentUserNotFound(new UserNotFoundError('any message'))

    expect(httpResponse.status).toHaveBeenCalledWith(404)
    expect(httpResponse.send).toHaveBeenCalledWith({
      message: `User not found: ${'any message'}`,
    })
  })

  it('Should send response with correct params in seccess case', () => {
    const { sut, httpResponse } = createSut()
    const fakeUser = createFakeUser({})

    sut.presentSuccessUpdateUser(fakeUser)

    expect(httpResponse.status).toHaveBeenCalledWith(200)
    expect(httpResponse.send).toHaveBeenCalledWith({
      id: fakeUser.id,
      age: fakeUser.age,
      city: fakeUser.city,
      email: fakeUser.email,
      name: fakeUser.name,
    })
  })
})
