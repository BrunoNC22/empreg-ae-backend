import { InjectRepository } from '@nestjs/typeorm'
import { Company } from '../../infra/entities/Company.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  async findAll() {
    return await this.companyRepository.find()
  }

  async findOne(id: string) {
    return await this.companyRepository.findOneBy({ id })
  }

  async remove(id: number) {
    return await this.companyRepository.delete(id)
  }

  async create({ id, companyName }: Company) {
    return await this.companyRepository.save({
      id,
      companyName,
    })
  }
}
