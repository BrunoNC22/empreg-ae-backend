import { v4 as uuidv4 } from 'uuid'

export class Company {
  private _id: string
  constructor(private _companyName: string) {
    this._id = uuidv4()
  }

  public get companyName(): string {
    return this._companyName
  }
  public set companyName(value: string) {
    this._companyName = value
  }
  public get id(): string {
    return this._id
  }
}
