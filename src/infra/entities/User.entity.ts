import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn({ generated: false })
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column({
    type: 'int',
    nullable: true,
  })
  public age: number | null

  @Column({
    type: 'text',
    nullable: true,
  })
  public city: string | null
}
