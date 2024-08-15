import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Company } from './Company.entity'
import { Location } from './value_objects/Location.entity'
import { Contact } from './value_objects/Contact.entity'

@Entity()
export class JobOpportiunity {
  @PrimaryColumn({
    generated: false,
  })
  public id: string

  @Column()
  public title: string

  @Column()
  public type: 'internship' | 'scholarship' | 'clt' | 'pj'

  @Column()
  public salary: number

  @Column('simple-array')
  public benefits: string[]

  @Column('simple-array')
  public requirements: string[]

  @Column()
  public description: string

  @Column()
  public publicationDate: Date

  @Column()
  public applicationDeadline: Date

  @Column()
  public workSchedule: 'part-time' | 'full-time'

  @Column()
  public workMode: 'onsite' | 'remote' | 'hybrid'

  @Column()
  public sector: string

  @Column()
  public level: 'junior' | 'mid' | 'senior' | 'managerial'

  @ManyToOne(() => Company, (company) => company.jobOpportunities)
  public company: Company

  @Column(() => Location)
  public location: Location

  @Column(() => Contact)
  public contact: Contact

  @Column('simple-array')
  public desiredSkills: string[]

  @Column()
  public education: string

  @Column({ nullable: true })
  public experience?: string
}
