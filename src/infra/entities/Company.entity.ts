import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { JobOpportiunity } from './JobOpportunity.entity'

@Entity()
export class Company {
  @PrimaryColumn({
    generated: false,
  })
  public id: string

  @Column()
  public companyName: string

  @OneToMany(
    () => JobOpportiunity,
    (jobOpportiunity) => jobOpportiunity.company,
  )
  public jobOpportunities: JobOpportiunity[]
}
