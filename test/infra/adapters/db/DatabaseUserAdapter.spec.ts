import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserNotFoundError } from 'src/domain/ports/output/db/UserNotFoundError'
import { DatabaseUserAdapter } from 'src/infra/adapters/db/DatabaseUserAdapter'
import { User } from 'src/infra/entities/User.entity'
import { User as DomainUser } from 'src/domain/entities/User'
import { ObjectLiteral, Repository } from 'typeorm'

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<NonNullable<unknown>>
}

type RepositoryMockFactory<T extends ObjectLiteral> = () => MockType<
  Repository<T>
>

export const repositoryMockFactory: RepositoryMockFactory<User> = jest.fn(
  () => ({
    findOne: jest.fn(),
    // ...
  }),
)

describe('DatabaseUserAdapter', () => {
  let sut: DatabaseUserAdapter
  let userRepository: Repository<User>
  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseUserAdapter,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile()

    sut = testingModule.get(DatabaseUserAdapter)
    userRepository = testingModule.get(getRepositoryToken(User))
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should throw user not found error when searching user by id', async () => {
    userRepository.findOneBy = jest.fn().mockResolvedValueOnce(null)

    expect(async () => {
      await sut.getById('any id')
    }).rejects.toThrow(
      new UserNotFoundError(`user with id ${'any id'} not found`),
    )
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 'any id' })
  })

  it('Should return an user with correct attributes when finding a user by id', async () => {
    const mockUser: User = {
      age: 2,
      city: 'valid city',
      email: 'valid email',
      id: 'valid id',
      name: 'valid name',
    }
    userRepository.findOneBy = jest.fn().mockResolvedValueOnce(mockUser)

    const response = await sut.getById('any id')

    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 'any id' })
    expect(response).toBeTruthy()
    expect(response.age).toBe(mockUser.age)
    expect(response.city).toBe(mockUser.city)
    expect(response.name).toBe(mockUser.name)
    expect(response.email).toBe(mockUser.email)
    expect(response.id).toBe(mockUser.id)
  })

  it('Should throw user not found error when searching user by email', async () => {
    userRepository.findOneBy = jest.fn().mockResolvedValueOnce(null)

    expect(async () => {
      await sut.getByEmail('any email')
    }).rejects.toThrow(
      new UserNotFoundError(`user with email ${'any email'} not found`),
    )
    expect(userRepository.findOneBy).toHaveBeenCalledWith({
      email: 'any email',
    })
  })

  it('Should return an user with correct attributes when finding a user by email', async () => {
    const mockUser: User = {
      age: 2,
      city: 'valid city',
      email: 'valid email',
      id: 'valid id',
      name: 'valid name',
    }
    userRepository.findOneBy = jest.fn().mockResolvedValueOnce(mockUser)

    const response = await sut.getByEmail('any email')

    expect(userRepository.findOneBy).toHaveBeenCalledWith({
      email: 'any email',
    })
    expect(response.age).toBe(mockUser.age)
    expect(response.name).toBe(mockUser.name)
    expect(response.email).toBe(mockUser.email)
    expect(response.city).toBe(mockUser.city)
    expect(response.id).toBe(mockUser.id)
  })

  it('Should save an user', async () => {
    const mockDomainUser = new DomainUser('valid name', 'valid email')
    userRepository.save = jest.fn()

    await sut.save(mockDomainUser)

    expect(userRepository.save).toHaveBeenCalledWith({
      age: mockDomainUser.age,
      city: mockDomainUser.city,
      name: mockDomainUser.name,
      email: mockDomainUser.email,
      id: mockDomainUser.id,
    })
  })
})
