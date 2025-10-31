import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../infra/entities/User.entity'
import { User as DomainUser } from '../../domain/entities/User'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../../infra/adapters/rest/dto/UserDto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id })
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  async remove(id: number) {
    return await this.userRepository.delete(id)
  }

  async create({ name, email }: CreateUserDto): Promise<User> {
    const user = new DomainUser(name, email)
    return await this.userRepository.save({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  }
}
