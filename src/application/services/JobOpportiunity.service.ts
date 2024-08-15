import { Injectable, NotFoundException } from '@nestjs/common'
import JobOpportunity from '../../domain/entities/JobOpportunity'
import { CreateJobOpportunityDto } from '../dto/JobOpportunityDto'
import { InjectRepository } from '@nestjs/typeorm'
import { JobOpportiunity as JobOpportiunityEntity } from '../../infra/entities/JobOpportunity.entity'
import { Repository } from 'typeorm'
import { CompanyService } from './Company.service'

@Injectable()
export class JobOpportunityService {
  constructor(
    @InjectRepository(JobOpportiunityEntity)
    private jobOpportunityRepository: Repository<JobOpportiunityEntity>,
    private companyService: CompanyService,
  ) {}

  getJobOpportunities = async () => {
    return await this.jobOpportunityRepository.find()
  }

  getJobOpportunity = async (jobopportunityId: string) => {
    const foundJobOpportunity = await this.jobOpportunityRepository.findOneBy({
      id: jobopportunityId,
    })

    if (foundJobOpportunity) {
      return foundJobOpportunity
    }
    throw new NotFoundException('Job opportunity not found')
  }

  createJobOpportunity = async (
    createJobopportunityDto: CreateJobOpportunityDto,
  ) => {
    const foundCompany = await this.companyService.findOne(
      createJobopportunityDto.companyId,
    )

    if (!foundCompany) {
      throw new NotFoundException(
        `Company with id ${createJobopportunityDto.companyId} not found.`,
      )
    }

    const newJobOpportunity = new JobOpportunity(
      createJobopportunityDto.companyId,
      createJobopportunityDto.location,
      createJobopportunityDto.title,
      createJobopportunityDto.type,
      createJobopportunityDto.salary,
      createJobopportunityDto.benefits,
      createJobopportunityDto.requirements,
      createJobopportunityDto.description,
      createJobopportunityDto.publicationDate,
      createJobopportunityDto.applicationDeadline,
      createJobopportunityDto.workSchedule,
      createJobopportunityDto.workMode,
      createJobopportunityDto.sector,
      createJobopportunityDto.level,
      createJobopportunityDto.contact,
      createJobopportunityDto.desiredSkills,
      createJobopportunityDto.education,
      createJobopportunityDto.experience,
    )
    const savedJobOpportunity = await this.jobOpportunityRepository.save({
      ...newJobOpportunity,
      id: newJobOpportunity.getId(),
      title: newJobOpportunity.getTitle(),
      description: newJobOpportunity.getDescription(),
      company: {
        id: foundCompany.id,
        companyName: foundCompany.companyName,
      },
    })
    return savedJobOpportunity
  }

  delete = async (jobOpportunityId: string) => {
    const foundJobOpportunity = await this.jobOpportunityRepository.findOneBy({
      id: jobOpportunityId,
    })

    if (!foundJobOpportunity) {
      throw new NotFoundException(
        `Job opportunity with id ${jobOpportunityId} not found.`,
      )
    }

    this.jobOpportunityRepository.delete(jobOpportunityId)
  }
}
