import { v4 as uuidv4 } from 'uuid'

export class User {
  private _id: string
  private _age: number | null
  private _city: string | null
  constructor(
    private _name: string,
    private _email: string,
  ) {
    this._id = uuidv4()
    this._age = null
    this._city = null
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
  public set id(newId: string) {
    this._id = newId
  }

  public get age(): number | null {
    return this._age
  }
  public set age(newAge: number) {
    if (newAge < 0) {
      throw new Error('Age cannot be negative')
    }
    this._age = newAge
  }

  public get city(): string | null {
    return this._city
  }
  public set city(newCity: string) {
    this._city = newCity
  }
}
