import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String
  @column()
  public branch: String
  @column()
  public roletype: String
  @column()
  public username: String
  @column()
  public password: String
  @column()
  public dial_code: String
  @column()
  public phone: String
  @column()
  public email: String
  @column()
  public address: String
  @column()
  public status: String
  @column()
  public date: Date



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
