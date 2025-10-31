import { Body, Controller, Get, Post } from '@nestjs/common'
import { v4 } from 'uuid'
import { CreateCompanyDto } from '../adapters/rest/dto/CompanyDto'
import { CompanyService } from '../services/Company.service'

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  create(@Body() newCompany: CreateCompanyDto) {
    const id = v4()
    const createdCompany = this.companyService.create({
      id,
      companyName: newCompany.name,
      jobOpportunities: [],
    })
    return createdCompany
  }

  @Get()
  getAll(): Promise<any> {
    return this.companyService.findAll()
  }
}
