import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/domain/entities/User'
import { UserNotFoundError } from 'src/domain/ports/output/db/UserNotFoundError'
import { UserPersistanceOperationsOutputPort } from 'src/domain/ports/output/db/UserPersistanceOperationsOutputPort.ts'
import { User as UserDB } from 'src/infra/entities/User.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DatabaseUserAdapter
  implements UserPersistanceOperationsOutputPort
{
  constructor(
    @InjectRepository(UserDB) private userRepository: Repository<UserDB>,
  ) {}

  async getByEmail(email: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ email })
    if (!foundUser) {
      throw new UserNotFoundError(`user with email ${email} not found`)
    }

    const user = new User(foundUser.name, foundUser.email)
    user.id = foundUser.id
    if (foundUser.city) {
      user.city = foundUser.city
    }
    if (foundUser.age) {
      user.age = foundUser.age
    }

    return user
  }

  async save(user: User): Promise<void> {
    await this.userRepository.save({
      id: user.id,
      age: user.age,
      city: user.city,
      email: user.email,
      name: user.name,
    })
  }

  async getById(id: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id })
    if (!foundUser) {
      throw new UserNotFoundError(`user with id ${id} not found`)
    }

    const user = new User(foundUser.name, foundUser.email)
    user.id = foundUser.id
    if (foundUser.city) {
      user.city = foundUser.city
    }
    if (foundUser.age) {
      user.age = foundUser.age
    }

    return user
  }
}
