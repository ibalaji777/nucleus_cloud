import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Break extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public company_id: number
  @column()
  public name: String
  @column()
  public group: String
  @column()
  public description: String

  @column()
  public start_time: String
  @column()
  public end_time: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
