import { v4 as uuidv4 } from 'uuid'
import { LocationType } from './types/LocationType'
import { ContactType } from './types/ContactType'

export default class JobOpportunity {
  private id: string

  constructor(
    private companyId: string,
    private location: LocationType,
    private title: string,
    private type: 'internship' | 'scholarship' | 'clt' | 'pj',
    private salary: number,
    private benefits: string[], // List of benefits (e.g., Meal voucher, Health insurance)
    private requirements: string[], // List of requirements (e.g., Knowledge in Python, Sales experience)
    private description: string, // Job description
    private publicationDate: string, // Publication date (ISO 8601 format)
    private applicationDeadline: string, // Application deadline (ISO 8601 format)
    private workSchedule: 'part-time' | 'full-time', // Work schedule
    private workMode: 'onsite' | 'remote' | 'hybrid', // Work mode
    private sector: string, // Company sector (e.g., IT, Marketing)
    private level: 'junior' | 'mid' | 'senior' | 'managerial', // Job level
    private contact: ContactType,
    private desiredSkills: string[], // List of desired skills
    private education: string, // Required education level (e.g., Bachelor's degree)
    private experience?: string, // Required experience (e.g., 2 years)
  ) {
    this.id = uuidv4()
  }

  public getId = () => {
    return this.id
  }

  public getCompanyId = () => {
    return this.companyId
  }

  public setCompanyId = (value: string) => {
    this.companyId = value
  }

  public getLocation = () => {
    return this.location
  }

  public setLocation = (value: LocationType) => {
    this.location = value
  }

  public getTitle = () => {
    return this.title
  }

  public setTitle = (value: string) => {
    this.title = value
  }

  public getType = () => {
    return this.type
  }

  public setType = (value: 'internship' | 'scholarship' | 'clt' | 'pj') => {
    this.type = value
  }

  public getSalary = () => {
    return this.salary
  }

  public setSalary = (value: number) => {
    this.salary = value
  }

  public getBenefits = () => {
    return this.benefits
  }

  public setBenefits = (value: string[]) => {
    this.benefits = value
  }

  public getRequirements = () => {
    return this.requirements
  }

  public setRequirements = (value: string[]) => {
    this.requirements = value
  }

  public getDescription = () => {
    return this.description
  }

  public setDescription = (value: string) => {
    this.description = value
  }

  public getPublicationDate = () => {
    return this.publicationDate
  }

  public setPublicationDate = (value: string) => {
    this.publicationDate = value
  }

  public getApplicationDeadline = () => {
    return this.applicationDeadline
  }

  public setApplicationDeadline = (value: string) => {
    this.applicationDeadline = value
  }

  public getWorkSchedule = () => {
    return this.workSchedule
  }

  public setWorkSchedule = (value: 'part-time' | 'full-time') => {
    this.workSchedule = value
  }

  public getWorkMode = () => {
    return this.workMode
  }

  public setWorkMode = (value: 'onsite' | 'remote' | 'hybrid') => {
    this.workMode = value
  }

  public getSector = () => {
    return this.sector
  }

  public setSector = (value: string) => {
    this.sector = value
  }

  public getLevel = () => {
    return this.level
  }

  public setLevel = (value: 'junior' | 'mid' | 'senior' | 'managerial') => {
    this.level = value
  }

  public getContact = () => {
    return this.contact
  }

  public setContact = (value: ContactType) => {
    this.contact = value
  }

  public getDesiredSkills = () => {
    return this.desiredSkills
  }

  public setDesiredSkills = (value: string[]) => {
    this.desiredSkills = value
  }

  public getEducation = () => {
    return this.education
  }

  public setEducation = (value: string) => {
    this.education = value
  }

  public getExperience = () => {
    return this.experience
  }

  public setExperience = (value?: string) => {
    this.experience = value
  }
}
