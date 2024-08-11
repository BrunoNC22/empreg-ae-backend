import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Company } from './Company.entity'

@Entity()
export class JobOpportiunity {
  @PrimaryColumn({
    generated: false,
  })
  public id: string

  @Column()
  public title: string

  @Column()
  public description: string

  @ManyToOne(() => Company, (company) => company.jobOpportunities)
  public company: Company
}
