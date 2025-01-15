import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn({ generated: false })
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string
}
