import { Body, Controller, Get, Post } from '@nestjs/common'
import { CompanyService } from '../services/Company.service'
import { v4 } from 'uuid'

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  create(@Body() newCompany: { companyName: string }) {
    const id = v4()
    this.companyService.create({ id, companyName: newCompany.companyName })
  }

  @Get()
  getAll(): Promise<any> {
    return this.companyService.findAll()
  }
}
