import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Downtime extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  name:String
  @column()
  description: Number
  @column()
  group:String
  @column()
  branch:String
  @column()
  type:Number
  @column()
  minutes:Number


  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
