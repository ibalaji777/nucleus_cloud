import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Customrule extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
public  branch: String
@column()
public  name: String
@column()
public  rule: String
  @column()
public  other: Object

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
