import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ConfigProductFormat extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public branch
  @column()
  public config
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
