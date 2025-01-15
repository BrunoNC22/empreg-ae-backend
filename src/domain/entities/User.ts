import { v4 as uuidv4 } from 'uuid'

export class User {
  private _id: string
  constructor(
    private _name: string,
    private _email: string,
  ) {
    this._id = uuidv4()
  }

  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    this._name = value
  }

  public get email(): string {
    return this._email
  }
  public set email(value: string) {
    this._email = value
  }

  public get id(): string {
    return this._id
  }
}
