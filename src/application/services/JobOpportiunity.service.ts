import { Injectable, NotFoundException } from '@nestjs/common'
import JobOpportunity from '../../domain/entities/JobOpportunity'
import { CreateJobOpportunityDto } from '../JobOpportunityDto'

@Injectable()
export class JobOpportunityService {
  private readonly jobOpportinuties: JobOpportunity[] = []

  getJobOpportunities = () => {
    return this.jobOpportinuties
  }

  getJobOpportunity = (jobopportunityId: string) => {
    const foundJobOpportunity = this.jobOpportinuties.find((jobopportunity) => {
      jobopportunity.getId() === jobopportunityId
    })

    if (foundJobOpportunity) {
      return foundJobOpportunity
    }
    throw new NotFoundException('Job opportunity not found')
  }

  createJobOpportunity = (createJobopportunityDto: CreateJobOpportunityDto) => {
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

    this.jobOpportinuties.push(newJobOpportunity)
    return newJobOpportunity
  }
}
