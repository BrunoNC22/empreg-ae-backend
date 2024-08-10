import { InjectRepository } from '@nestjs/typeorm'
import { Company } from '../../infra/entities/Company.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find()
  }

  findOne(id: string): Promise<Company | null> {
    return this.companyRepository.findOneBy({ id })
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id)
  }

  async create({ id, companyName }: Company): Promise<void> {
    await this.companyRepository.save({
      id,
      companyName,
    })
  }
}
