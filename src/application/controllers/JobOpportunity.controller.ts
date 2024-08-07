import { Body, Controller, Get, Post } from '@nestjs/common'
import { JobOpportunityService } from '../services/JobOpportiunity.service'
import { CreateJobOpportunityDto } from '../JobOpportunityDto'
import { ConfigService } from '@nestjs/config'

@Controller('job-opportunities')
export class JobOpportunityController {
  constructor(
    private jobOpportunityService: JobOpportunityService,
    private configService: ConfigService,
  ) {}

  @Post()
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
