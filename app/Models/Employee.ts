import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public branch:string
  @column()
  public name:string
  @column()
  public email:string
  @column()
  public dialcode:string
  @column()
  public phone:string
  @column()
  public password:string
  @column()
  public role:string
  @column()
  public idcard:string
  @column()
  public other:string
  @column()
  public config:JSON
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
