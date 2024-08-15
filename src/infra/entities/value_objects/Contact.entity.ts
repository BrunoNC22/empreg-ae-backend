import { Column } from 'typeorm'

export class Contact {
  @Column()
  public email: string

  @Column()
  public phone: string
}
