import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String
  @column()
  public dialcode: String
  @column()
  public phone: String
  @column()
  public email: String
  @column()
  public password: String
  @column()
  public company_name: String
  @column()
  public active: Boolean
  @column()
  public active_status: String


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
