import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GroupConfig extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public machine_id: number

  @column()
  public task: string

  @column()
  public group: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
