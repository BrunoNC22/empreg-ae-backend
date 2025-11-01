import { UserNotFoundError } from 'src/domain/ports/output/db/UserNotFoundError'
import { UpdateUser } from 'src/domain/usecases/UpdateUser'
import { UserPersisterMock } from 'test/infra/adapters/db/UserPersisterMock'
import { UpdateUserPresenterMock } from 'test/infra/adapters/presenters/UpdateUserPresenterMock'
import { createFakeUser } from '../entities/createFakeUser'

type CreateSutProps = {
  updateUserPresenterMock?: UpdateUserPresenterMock
  userPersisterMock?: UserPersisterMock
}

const createSut = ({
  updateUserPresenterMock = new UpdateUserPresenterMock(),
  userPersisterMock = new UserPersisterMock(),
}: CreateSutProps) => {
  const sut = new UpdateUser(userPersisterMock, updateUserPresenterMock)

  return {
    sut,
    userPersisterMock,
    updateUserPresenterMock,
  }
}

describe('UpdateUser', () => {
  it('Shold present user not found error when user with given id does not exist', async () => {
    const { sut, updateUserPresenterMock } = createSut({
      userPersisterMock: new UserPersisterMock(
        undefined,
        undefined,
        new UserNotFoundError(),
      ),
    })

    await sut.updateUser({ id: 'invalid id' })

    expect(updateUserPresenterMock.userNotFoundError).toBeInstanceOf(
      UserNotFoundError,
    )
  })

  it('Should call present default error when an unexpected error occurs', async () => {
    const { sut, updateUserPresenterMock } = createSut({
      userPersisterMock: new UserPersisterMock(undefined, undefined, new Error('some message'))
    })

    await sut.updateUser({ id: 'some id' })

    expect(updateUserPresenterMock.defaultError).toBeTruthy()
    expect(updateUserPresenterMock.defaultError?.message).toBe('some message')
  })

  it('Should save user with new parameters values', async () => {
    const mockUser = createFakeUser({})
    const { sut, userPersisterMock } = createSut({
      userPersisterMock: new UserPersisterMock(mockUser)
    })

    await sut.updateUser({ id: 'valid id', age: 25, city: 'asjbajsdajs', email: 'ajksnkdajsd', name: 'aksda' })

    expect(userPersisterMock.saveUser?.age).toBe(25)
    expect(userPersisterMock.saveUser?.email).toBe('ajksnkdajsd')
    expect(userPersisterMock.saveUser?.name).toBe('aksda')
    expect(userPersisterMock.saveUser?.city).toBe('asjbajsdajs')
  })

  it('should present user with updated params', async () => {
    const mockUser = createFakeUser({})
    const { sut, updateUserPresenterMock } = createSut({
      userPersisterMock: new UserPersisterMock(mockUser)
    })

    await sut.updateUser({ id: 'valid id', age: 25, city: 'asjbajsdajs', email: 'ajksnkdajsd', name: 'aksda' })

    expect(updateUserPresenterMock.successUser?.age).toBe(25)
    expect(updateUserPresenterMock.successUser?.email).toBe('ajksnkdajsd')
    expect(updateUserPresenterMock.successUser?.name).toBe('aksda')
    expect(updateUserPresenterMock.successUser?.city).toBe('asjbajsdajs')
  })
})
