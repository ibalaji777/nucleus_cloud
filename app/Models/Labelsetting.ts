import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Labelsetting extends BaseModel {
  // @column({ isPrimary: true })
  // public id: number
   @column({ isPrimary: true })
  public branch

  @column()
  public config :Object
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
