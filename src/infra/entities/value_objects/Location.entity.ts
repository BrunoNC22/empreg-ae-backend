import { Column } from 'typeorm'

export class Location {
  @Column()
  public state: string

  @Column()
  public city: string
}
