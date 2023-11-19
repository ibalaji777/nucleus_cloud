import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Break extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: String
  @column()
  public user_id: number
  @column()
  public description: String
  @column()
  public minutes: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
