import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../infra/entities/User.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

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

  async remove(id: number) {
    return await this.userRepository.delete(id)
  }

  async create({ id, name, email }: User) {
    return await this.userRepository.save({
      id,
      name,
      email,
    })
  }
}
