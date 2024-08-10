import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Company {
  @PrimaryColumn({
    generated: false,
  })
  public id: string

  @Column()
  public companyName: string
}
