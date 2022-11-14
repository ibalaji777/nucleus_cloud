import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Downtime extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  company_id:Number
  @column()
  name:String
  @column()
  description: Number
  @column()
  group:Number
  @column()
  type:String


  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
