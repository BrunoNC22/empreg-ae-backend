import { User } from 'src/domain/entities/User'

export interface SaveUserOutputPort {
  save(user: User): Promise<void>
}

export interface GetUserByEmailOutputPort {
  getByEmail(email: string): Promise<User>
}

export interface GetUserByIdOutputPort {
  getById(id: string): Promise<User>
}

export interface UserPersistanceOperationsOutputPort
  extends SaveUserOutputPort,
    GetUserByEmailOutputPort,
    GetUserByIdOutputPort {}
