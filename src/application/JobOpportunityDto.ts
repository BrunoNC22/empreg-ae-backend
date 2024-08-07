import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsDateString,
  IsIn,
  IsObject,
  IsNotEmpty,
} from 'class-validator'
import { ContactType } from 'src/domain/types/ContactType'
import { LocationType } from 'src/domain/types/LocationType'

export class CreateJobOpportunityDto {
  @IsString()
  @IsNotEmpty()
  public companyId: string

  @IsObject()
  public location: LocationType

  @IsString()
  @IsNotEmpty()
  public title: string

  @IsIn(['internship', 'scholarship', 'clt', 'pj'])
  public type: 'internship' | 'scholarship' | 'clt' | 'pj'

  @IsNumber()
  public salary: number

  @IsArray()
  public benefits: string[] // List of benefits (e.g. Meal voucher Health insurance)

  @IsArray()
  public requirements: string[] // List of requirements (e.g. Knowledge in Python Sales experience)

  @IsString()
  @IsNotEmpty()
  public description: string // Job description

  @IsDateString()
  public publicationDate: string // Publication date (ISO 8601 format)

  @IsDateString()
  public applicationDeadline: string // Application deadline (ISO 8601 format)

  @IsIn(['part-time', 'full-time'])
  public workSchedule: 'part-time' | 'full-time'

  @IsIn(['onsite', 'remote', 'hybrid'])
  public workMode: 'onsite' | 'remote' | 'hybrid'

  @IsString()
  @IsNotEmpty()
  public sector: string // Company sector (e.g. IT Marketing)

  @IsIn(['junior', 'mid', 'senior', 'managerial'])
  public level: 'junior' | 'mid' | 'senior' | 'managerial'

  @IsObject()
  public contact: ContactType

  @IsArray()
  public desiredSkills: string[]

  @IsString()
  @IsNotEmpty()
  public education: string // Required education level (e.g. Bachelor's degree)

  @IsOptional()
  @IsString()
  public experience?: string // Required experience (e.g. 2 years)
}
