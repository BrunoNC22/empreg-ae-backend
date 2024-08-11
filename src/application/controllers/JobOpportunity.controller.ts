import { Body, Controller, Get, Post } from '@nestjs/common'
import { JobOpportunityService } from '../services/JobOpportiunity.service'
import { CreateJobOpportunityDto } from '../dto/JobOpportunityDto'
import { ConfigService } from '@nestjs/config'
import { ApiCreatedResponse } from '@nestjs/swagger'

@Controller('job-opportunities')
export class JobOpportunityController {
  constructor(
    private jobOpportunityService: JobOpportunityService,
    private configService: ConfigService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'A vaga de emprego foi cirada com sucesso!',
    type: CreateJobOpportunityDto,
  })
  create(@Body() createJobOpportunityDto: CreateJobOpportunityDto) {
    const newJobOpportunity = this.jobOpportunityService.createJobOpportunity(
      createJobOpportunityDto,
    )
    return newJobOpportunity
  }

  @Get()
  getAll() {
    const jobOpportunities = this.jobOpportunityService.getJobOpportunities()
    return jobOpportunities
  }
}
