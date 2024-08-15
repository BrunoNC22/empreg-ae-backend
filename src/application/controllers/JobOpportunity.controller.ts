import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { JobOpportunityService } from '../services/JobOpportiunity.service'
import { CreateJobOpportunityDto } from '../dto/JobOpportunityDto'
import { ConfigService } from '@nestjs/config'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('job opportunity')
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
  async create(@Body() createJobOpportunityDto: CreateJobOpportunityDto) {
    const newJobOpportunity =
      await this.jobOpportunityService.createJobOpportunity(
        createJobOpportunityDto,
      )
    return newJobOpportunity
  }

  @Get()
  async getAll() {
    const jobOpportunities =
      await this.jobOpportunityService.getJobOpportunities()
    return jobOpportunities
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.jobOpportunityService.getJobOpportunity(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.jobOpportunityService.delete(id)
  }
}
